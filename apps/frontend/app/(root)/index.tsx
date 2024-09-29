import {Hero} from '@/components/Hero'
import ParallaxGallery from '@/components/ParallaxGallery'
import useScreenSize from '@/hooks/useScreenSize'
import {Dimensions} from 'react-native'
import {Box} from 'react-native-ficus-ui'

const Index = () => {
  const {isBigScreen} = useScreenSize()
  const headerHeight = (isBigScreen ? 0.3 : 0.75) * Dimensions.get('window').height
  return (
    <Box flex={1}>
      <ParallaxGallery hero={<Hero headerHeight={headerHeight} />} headerHeight={headerHeight} />
    </Box>
  )
}

export default Index
