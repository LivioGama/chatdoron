import useDebounce from '@/hooks/useDebounce'
import {randomCatPictures} from '@/utils/randomCatPictures'
import {useInfiniteQuery} from '@tanstack/react-query'
import isFinite from 'lodash/isFinite'
import times from 'lodash/times'
import Media from 'models/Media'
import {useCallback, useMemo} from 'react'

const PAGE_SIZE = 50
const TOTAL_COUNT = 1200
const INITIAL_PAGE_PARAM = 1

type ApiResponse = {
  data: Partial<Media>[]
  meta: {
    pagination: {
      page?: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

const useMedias = (isReady: boolean) => {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, refetch, error} =
    useInfiniteQuery<ApiResponse>({
      queryKey: ['medias'],
      enabled: isReady,
      queryFn: ({pageParam}) => {
        console.log('pageParam', pageParam)
        return new Promise<ApiResponse>(resolve => {
          resolve({
            data: times(PAGE_SIZE, index => ({
              id: ((pageParam as number) * PAGE_SIZE + index).toString(),
              date: new Date(),
              width: 100,
              height: 100,
            })),
            meta: {
              pagination: {
                page: isFinite(pageParam) ? (pageParam as number) : undefined,
                pageSize: PAGE_SIZE,
                pageCount: Math.ceil(TOTAL_COUNT / PAGE_SIZE),
                total: TOTAL_COUNT,
              },
            },
          })
        })
      },
      getNextPageParam: lastPage => {
        if (lastPage?.meta?.pagination?.page < lastPage?.meta?.pagination?.pageCount) {
          console.log(' lastPage.meta.pagination.page', lastPage.meta.pagination.page + 1)
          return lastPage.meta.pagination.page + 1
        }
        console.log('bug')
        return undefined
      },
      initialPageParam: INITIAL_PAGE_PARAM,
    })
  console.log('hasNextPage', hasNextPage)
  const onRefresh = useCallback(() => refetch().then(() => undefined), [refetch])

  const onInfinite = useDebounce(() => {
    console.log('onInfinite')
    if (hasNextPage && !isFetchingNextPage && !isFetching) {
      return fetchNextPage()
    }
    return Promise.resolve()
  }, 300)

  console.log(data?.pages)

  const medias = useMemo(
    () =>
      data?.pages.flatMap(page =>
        page.data.map(
          media =>
            new Media(
              Media.parse({
                ...media,
                picture: randomCatPictures[Math.floor(Math.random() * randomCatPictures.length)],
              }),
            ),
        ),
      ) || [],
    [data],
  )

  return {
    medias,
    onRefresh,
    onInfinite: onInfinite as () => Promise<void>,
    isFetchingNextPage,
    isFetching,
    error,
  }
}

export default useMedias
