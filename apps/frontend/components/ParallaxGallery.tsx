import {AnimatedGalleryItem} from '@/components/AnimatedGalleryItem'
import useMedias from '@/hooks/useMedias'
import useScreenSize from '@/hooks/useScreenSize'
import {MasonryFlashList} from '@shopify/flash-list'
import isEmpty from 'lodash/isEmpty'
import Media from 'models/Media'
import {ReactElement, useCallback, useEffect} from 'react'
import {ScrollView, useWindowDimensions, View} from 'react-native'
import {Box, Spinner} from 'react-native-ficus-ui'
import {useDerivedValue, useSharedValue, withTiming} from 'react-native-reanimated'
import {GAP} from 'models/consts'

interface ParallaxGalleryProps {
  hero: ReactElement
  headerHeight: number
}

const ParallaxGallery = ({hero, headerHeight}: ParallaxGalleryProps) => {
  const {isSmallScreen, isTablet, isDesktop} = useScreenSize()
  const {width: windowWidth} = useWindowDimensions()

  const columnNumDerived = useDerivedValue(
    () => (isSmallScreen ? 2 : isTablet ? 3 : isDesktop ? 4 : 5),
    [isSmallScreen, isTablet],
  )
  const columnNum = columnNumDerived.value

  const {data: medias} = useMedias()

  const imageWidthShared = useSharedValue(windowWidth / columnNum)

  useEffect(() => {
    imageWidthShared.value = withTiming(windowWidth / columnNum, {duration: 300})
  }, [windowWidth, columnNum])

  const renderItem = useCallback(
    ({item: media}) => (
      <Box mr={GAP}>
        <AnimatedGalleryItem media={media} imageWidthShared={imageWidthShared} />
      </Box>
    ),
    [imageWidthShared],
  )
  return (
    <ScrollView>
      <View
        style={[
          {
            height: headerHeight,
            overflow: 'hidden',
          },
        ]}>
        {hero}
      </View>
      {isEmpty(medias) ? (
        <Spinner size='large' />
      ) : (
        <MasonryFlashList
          data={medias}
          keyExtractor={(item: Media) => item.id}
          numColumns={columnNum}
          renderItem={renderItem}
          estimatedItemSize={265}
          contentContainerStyle={{
            paddingLeft: GAP,
            paddingVertical: GAP,
            backgroundColor: '#E6DBC8',
          }}
          ItemSeparatorComponent={() => <Box h={GAP} />}
        />
      )}
    </ScrollView>
  )
}

export default ParallaxGallery
