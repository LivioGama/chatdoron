import {Image} from 'expo-image'
import Media from 'models/Media'
import {memo} from 'react'
import {StyleSheet} from 'react-native'
import {Box} from 'react-native-ficus-ui'
import Animated, {useAnimatedStyle} from 'react-native-reanimated'

export const AnimatedGalleryItem = memo(
  ({media, imageWidthShared, GAP}: {media: Media; imageWidthShared: any; GAP: number}) => {
    const animatedImageStyle = useAnimatedStyle(() => ({
      width: imageWidthShared.value,
      height: imageWidthShared.value / media.aspectRatio,
    }))

    return (
      <Box px={GAP}>
        <Animated.View style={animatedImageStyle}>
          <Image
            alt='Photo Chat'
            style={{
              ...StyleSheet.absoluteFillObject,
              borderRadius: 8,
            }}
            source={media.picture}
            contentFit='cover'
            transition={300}
          />
        </Animated.View>
      </Box>
    )
  },
  (prevProps, nextProps) =>
    prevProps.media.id === nextProps.media.id &&
    prevProps.imageWidthShared === nextProps.imageWidthShared &&
    prevProps.GAP === nextProps.GAP,
)

AnimatedGalleryItem.displayName = 'AnimatedGalleryItem'
