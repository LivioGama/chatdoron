import {Image} from 'expo-image'
import {useEffect, useState} from 'react'
import {Platform} from 'react-native'
import {Box, Center, HStack, Text, VStack} from 'react-native-ficus-ui'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

export const Hero = ({headerHeight}: {headerHeight: number}) => {
  const pictureSize = headerHeight * 0.8
  const scale = useSharedValue(0.8)
  const opacity = useSharedValue(0)
  const [showShadow, setShowShadow] = useState(false)

  useEffect(() => {
    const animationDuration = 1000
    scale.value = withSequence(
      withTiming(1, {duration: animationDuration}),
      withDelay(
        animationDuration,
        withTiming(1, {duration: 1}, () => {
          runOnJS(setShowShadow)(true)
        }),
      ),
    )
    opacity.value = withTiming(1, {duration: animationDuration})
  }, [])

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }))

  const shadowStyle = Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.3,
      shadowRadius: 12,
    },
    android: {
      elevation: 10,
    },
  })

  return (
    <Center h={headerHeight} bg='#5D6E7A' w='100%'>
      <Box w='100%' maxW={1280}>
        <HStack justify='space-between' w='100%' alignItems='center'>
          <Animated.View style={[animatedStyles, showShadow && shadowStyle]}>
            <Image
              source={require('@/assets/merguez.webp')}
              style={{
                width: pictureSize,
                height: pictureSize,
                borderRadius: pictureSize / 2,
                borderWidth: 4,
                borderColor: '#FFFFFF',
              }}
            />
          </Animated.View>
          <VStack alignItems='center' spacing={16}>
            <Text fontSize='5rem' color='accent' fontFamily='Merriweather_400Regular'>
              Chat d'Oron
            </Text>
            <Text fontSize='2rem' color='accent' fontFamily='OpenSans_400Regular'>
              Notre plus grand rêve est de t'offrir la vie que tu mérite
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Center>
  )
}
