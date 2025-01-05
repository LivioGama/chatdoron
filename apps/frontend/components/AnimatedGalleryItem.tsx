import {Image} from 'expo-image'
import Media from 'models/Media'
import {memo} from 'react'
import {StyleSheet} from 'react-native'
import {Box, Text} from 'react-native-ficus-ui'
import Animated, {useAnimatedStyle} from 'react-native-reanimated'
import dayjs from 'dayjs'

export const AnimatedGalleryItem = memo(
  ({media, imageWidthShared, GAP}: {media: Media; imageWidthShared: any; GAP: number}) => {
    const animatedImageStyle = useAnimatedStyle(() => ({
      width: '100%',
      height: imageWidthShared.value / media.aspectRatio,
    }))

    return (
      <Box>
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
          <Text
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 10,
              color: 'white',
              textAlign: 'right',
              fontSize: 12,
              textShadowColor: '#333',
              textShadowOffset: {width: 0, height: 1},
              textShadowRadius: 1,
            }}
            numberOfLines={1}>
            {dayjs(media.date).format('DD/MM/YYYY')}
          </Text>
        </Animated.View>
        {media.story && (
          <Text p={5} color='#1C3D5A' fontSize='xs'>
            {media.story}
          </Text>
        )}
      </Box>
    )
  },
  (prevProps, nextProps) =>
    prevProps.media.id === nextProps.media.id &&
    prevProps.imageWidthShared === nextProps.imageWidthShared &&
    prevProps.GAP === nextProps.GAP,
)

AnimatedGalleryItem.displayName = 'AnimatedGalleryItem'
