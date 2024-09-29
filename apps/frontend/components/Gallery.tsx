import useMedias from '@/hooks/useMedias'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Dimensions, Image as RNImage} from 'react-native'
import {Image} from 'react-native-ficus-ui'
import Waterfall from 'react-native-virtualized-waterfall'

const Gallery = () => {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => setIsReady(true), [])

  const {medias, onRefresh, onInfinite} = useMedias(isReady)
  const [measuredMedias, setMeasuredMedias] = useState([])
  console.log('medias count', medias.length)
  const columnNum = 5
  const windowWidth = Dimensions.get('window').width
  const imageWidth = useMemo(() => windowWidth / columnNum, [windowWidth, columnNum])

  const measureImage = useCallback(
    media =>
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

  useEffect(() => {
    const updateMeasuredMedias = async () => {
      const newMeasuredMedias = await Promise.all(
        medias.map(async media => {
          if (media.calculatedHeight) return media
          return measureImage(media)
        }),
      )
      setMeasuredMedias(newMeasuredMedias)
    }

    updateMeasuredMedias()
  }, [medias, measureImage])

  const heightGetter = useCallback(
    (width: number, index: number) => {
      const item = measuredMedias[index]
      if (!item || !item.calculatedHeight) return imageWidth // Default height if item is not yet measured
      return item.calculatedHeight
    },
    [measuredMedias, imageWidth],
  )

  return (
    <Waterfall
      columnNum={columnNum}
      columnGap={10}
      itemInfos={measuredMedias}
      // bufferAmount={10}
      infiniteThreshold={50}
      heightGetter={heightGetter}
      renderItem={(media, width, height) => (
        <Image
          alt='Photo Merguez'
          h={height}
          w={width}
          source={{
            uri: media.picture,
          }}
        />
      )}
      // onRefresh={onRefresh}
      // onInfinite={onInfinite}
    />
  )
}

export default Gallery
