import {AnimatedGalleryItem} from '@/components/AnimatedGalleryItem'
import useMedias from '@/hooks/useMedias'
import useScreenSize from '@/hooks/useScreenSize'
import {MasonryFlashList} from '@shopify/flash-list'
import {LinearGradient} from 'expo-linear-gradient'
import isEmpty from 'lodash/isEmpty'
import meanBy from 'lodash/meanBy'
import sortBy from 'lodash/sortBy'
import Media from 'models/Media'
import {ReactElement, useCallback, useEffect, useMemo, useState} from 'react'
import {Image as RNImage, useWindowDimensions} from 'react-native'
import {Box, Center, Spinner} from 'react-native-ficus-ui'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import useAsyncEffect from 'use-async-effect'

interface ParallaxGalleryProps {
  hero: ReactElement
  headerHeight: number
}

const ParallaxGallery = ({hero, headerHeight}: ParallaxGalleryProps) => {
  const {isSmallScreen, isTablet, isDesktop} = useScreenSize()
  const {width: windowWidth} = useWindowDimensions()
  const [averageItemHeight, setAverageItemHeight] = useState(0)

  const columnNumDerived = useDerivedValue(
    () => (isSmallScreen ? 2 : isTablet ? 3 : isDesktop ? 4 : 5),
    [isSmallScreen, isTablet],
  )
  const columnNum = columnNumDerived.value
  const GAP = isSmallScreen ? 12 : 32

  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)
  const [measuredMedias, setMeasuredMedias] = useState([])
  const {data, onRefresh, onInfinite, isFetching} = useMedias()

  const imageWidthShared = useSharedValue(windowWidth / columnNum)

  useEffect(() => {
    imageWidthShared.value = withTiming(windowWidth / columnNum, {duration: 300})
  }, [windowWidth, columnNum])

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
      sortBy(
        data?.pages.flatMap(page => page.data.map(media => new Media(Media.parse(media)))),
        'id',
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
            resolve({...media, aspectRatio})
          },
          error => {
            console.error('Error measuring image:', error)
            resolve({...media, aspectRatio: 1})
          },
        )
      }),
    [],
  )

  useAsyncEffect(async () => {
    if (isEmpty(medias)) return
    const newMeasuredMedias = await Promise.all(
      medias.map(async media => {
        if (media.aspectRatio) return media
        return measureImage(media)
      }),
    )
    setMeasuredMedias(newMeasuredMedias)
    setAverageItemHeight(
      meanBy(newMeasuredMedias, (media: Media) => windowWidth / columnNum / media.aspectRatio),
    )
  }, [medias, measureImage, windowWidth, columnNum])

  const renderItem = useCallback(
    ({item: media}) => (
      <AnimatedGalleryItem media={media} imageWidthShared={imageWidthShared} GAP={GAP} />
    ),
    [imageWidthShared, GAP],
  )

  const shadowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollOffset.value, [0, headerHeight / 2], [0, 1], 'clamp'),
  }))

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
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: headerHeight,
            left: 0,
            right: 0,
            height: 80,
            zIndex: 1,
          },
          shadowAnimatedStyle,
        ]}>
        <LinearGradient colors={['rgba(0,0,0,0.3)', 'transparent']} style={{flex: 1}} />
      </Animated.View>
      {isEmpty(medias) ? (
        <Spinner size='large' />
      ) : (
        <MasonryFlashList
          data={measuredMedias}
          keyExtractor={(item: Media) => item.id.toString()}
          getItemType={item => 'image'}
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
