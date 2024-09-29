import {SingleChildrenProps} from 'models/interfaces'
import type {ReactElement} from 'react'
import {VStack} from 'react-native-ficus-ui'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'

interface Props extends SingleChildrenProps {
  hero: ReactElement
  headerHeight: number
}

const ParallaxScrollView = ({hero, children, headerHeight}: Props) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)

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
      <VStack flex={1} p={32} spacing={16} overflow='hidden'>
        {children}
      </VStack>
    </Animated.ScrollView>
  )
}

export default ParallaxScrollView
