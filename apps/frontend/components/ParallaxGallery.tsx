import useMedias from '@/hooks/useMedias'
import {randomCatPictures} from '@/utils/randomCatPictures'
import {MasonryFlashList} from '@shopify/flash-list'
import {Image} from 'expo-image'
import isEmpty from 'lodash/isEmpty'
import Media from 'models/Media'
import React, {useCallback, useMemo, useState} from 'react'
import {Dimensions, Image as RNImage} from 'react-native'
import {Box, Center, Spinner} from 'react-native-ficus-ui'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'
import useAsyncEffect from 'use-async-effect'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const GAP = 32
const columnNum = 5

interface ParallaxGalleryProps {
  hero: React.ReactElement
  headerHeight: number
}

const ParallaxGallery: React.FC<ParallaxGalleryProps> = ({hero, headerHeight}) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)
  const [measuredMedias, setMeasuredMedias] = useState([])
  const {data, onRefresh, onInfinite, isFetching} = useMedias()
  const imageWidth = useMemo(() => windowWidth / columnNum, [])

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-headerHeight, 0, headerHeight],
          [-headerHeight / 2, 0, headerHeight * 0.75],
        ),
      },
      {
        scale: interpolate(scrollOffset.value, [-headerHeight, 0, headerHeight], [2, 1, 1]),
      },
    ] as const,
  }))

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
            resolve({...media, aspectRatio: 1, calculatedHeight: imageWidth})
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
    [measuredMedias],
  )

  return (
    <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
      <Animated.View
        style={[
          {
            height: headerHeight,
            overflow: 'hidden',
          },
          headerAnimatedStyle,
        ]}>
        {hero}
      </Animated.View>
      {isEmpty(medias) ? (
        <Spinner size='large' />
      ) : (
        <MasonryFlashList
          data={measuredMedias}
          numColumns={columnNum}
          renderItem={renderItem}
          estimatedItemSize={averageItemHeight}
          onRefresh={onRefresh}
          contentContainerStyle={{
            paddingHorizontal: GAP / 2,
            paddingVertical: GAP,
            backgroundColor: '#E6DBC8',
          }}
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
      )}
    </Animated.ScrollView>
  )
}

export default ParallaxGallery
