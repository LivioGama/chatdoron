import {useInfiniteQuery} from '@tanstack/react-query'
import times from 'lodash/times'
import Media from 'models/Media'
import {useCallback} from 'react'

const PAGE_SIZE = 40
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

const useMedias = () => {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, refetch, error} =
    useInfiniteQuery<ApiResponse>({
      queryKey: ['medias'],
      queryFn: ({pageParam = 1}) =>
        new Promise<ApiResponse>(resolve => {
          setTimeout(() => {
            // Add a small delay to simulate network request
            resolve({
              data: times(PAGE_SIZE, index => ({
                id: (((pageParam as number) - 1) * PAGE_SIZE + index + 1).toString(),
                date: new Date(),
                width: 100,
                height: 100,
              })),
              meta: {
                pagination: {
                  page: pageParam as number,
                  pageSize: PAGE_SIZE,
                  pageCount: Math.ceil(TOTAL_COUNT / PAGE_SIZE),
                  total: TOTAL_COUNT,
                },
              },
            })
          }, 40)
        }),
      getNextPageParam: lastPage => {
        if (lastPage?.meta?.pagination?.page < lastPage?.meta?.pagination?.pageCount) {
          return lastPage.meta.pagination.page + 1
        }
        return undefined
      },
      initialPageParam: INITIAL_PAGE_PARAM,
    })

  const onRefresh = useCallback(() => refetch(), [refetch])

  const onInfinite = () => hasNextPage && !isFetchingNextPage && !isFetching && fetchNextPage()

  return {
    data,
    onRefresh,
    onInfinite,
    isFetchingNextPage,
    isFetching,
    error,
  }
}

export default useMedias
