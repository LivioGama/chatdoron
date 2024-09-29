import useMedias from '@/hooks/useMedias'
import {randomCatPictures} from '@/utils/randomCatPictures'
import {MasonryFlashList} from '@shopify/flash-list'
import {Image} from 'expo-image'
import isEmpty from 'lodash/isEmpty'
import Media from 'models/Media'
import {useCallback, useMemo, useState} from 'react'
import {Dimensions, Image as RNImage} from 'react-native'
import {Box, Center, Spinner} from 'react-native-ficus-ui'
import useAsyncEffect from 'use-async-effect'

const columnNum = 5
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const GAP = 32

const Gallery = () => {
  const [measuredMedias, setMeasuredMedias] = useState([])
  const {data, onRefresh, onInfinite, isFetching} = useMedias()
  const imageWidth = useMemo(() => windowWidth / columnNum, [windowWidth, columnNum])
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
      ),
    [data],
  )

  const measureImage = useCallback(
    (media: Media) =>
      new Promise(resolve => {
        RNImage.getSize(
          media.picture,
          (width, height) => {
            const aspectRatio = width / height
            const calculatedHeight = imageWidth / aspectRatio
            resolve({...media, aspectRatio, calculatedHeight})
          },
          error => {
            console.error('Error measuring image:', error)
            resolve({...media, aspectRatio: 1, calculatedHeight: imageWidth}) // Fallback to square if measurement fails
          },
        )
      }),
    [imageWidth],
  )

  useAsyncEffect(async () => {
    if (isEmpty(medias)) return
    const newMeasuredMedias = await Promise.all(
      medias.map(async media => {
        if (media.calculatedHeight) return media
        return measureImage(media)
      }),
    )
    setMeasuredMedias(newMeasuredMedias)
  }, [medias, measureImage])

  const renderItem = useCallback(
    ({item: media}) => (
      <Box px={GAP}>
        <Image
          alt='Photo Chat'
          style={{
            width: imageWidth,
            height: media.calculatedHeight,
            borderRadius: 8,
          }}
          source={media.picture}
          contentFit='cover'
          transition={1000}
        />
      </Box>
    ),
    [imageWidth],
  )

  const averageItemHeight = useMemo(
    () =>
      isEmpty(measuredMedias)
        ? windowHeight / 2
        : measuredMedias.reduce((sum, media) => sum + media.calculatedHeight, 0) /
          measuredMedias.length,
    [measuredMedias, windowHeight],
  )

  return isEmpty(medias) ? (
    <Spinner size='large' />
  ) : (
    <MasonryFlashList
      data={measuredMedias}
      numColumns={columnNum}
      renderItem={renderItem}
      estimatedItemSize={averageItemHeight}
      onRefresh={onRefresh}
      contentContainerStyle={{paddingHorizontal: GAP / 2, backgroundColor: '#E6DBC8'}}
      onEndReached={onInfinite}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={() => <Box h={GAP} />}
      refreshing={isFetching}
      ListFooterComponent={
        isFetching && (
          <Center w='100%' h={50}>
            <Spinner size={14} animating={isFetching} color='grey' />
          </Center>
        )
      }
    />
  )
}

export default Gallery
