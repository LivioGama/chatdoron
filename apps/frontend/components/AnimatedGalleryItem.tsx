import {Image} from 'expo-image'
import Media from 'models/Media'
import {memo, useEffect, useState} from 'react'
import {StyleSheet, Image as RNImage} from 'react-native'
import {Box, Text} from 'react-native-ficus-ui'
import dayjs from 'dayjs'

export const AnimatedGalleryItem = memo(
  ({media, imageWidthShared}: {media: Media; imageWidthShared: any}) => {
    const [aspectRatio, setAspectRatio] = useState(media.aspectRatio || 1)
    useEffect(() => {
      if (!media.aspectRatio) {
        RNImage.getSize(
          media.picture,
          (width, height) => {
            setAspectRatio(width / height)
          },
          error => {
            console.error('Error measuring image:', error)
            setAspectRatio(1)
          },
        )
      }
    }, [media.picture, media.aspectRatio])

    return (
      <Box>
        <Box w='100%' h={imageWidthShared.value / aspectRatio}>
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
        </Box>
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
    prevProps.imageWidthShared === nextProps.imageWidthShared,
)

AnimatedGalleryItem.displayName = 'AnimatedGalleryItem'
