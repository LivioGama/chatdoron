import {Hero} from '@/components/Hero'
import ParallaxGallery from '@/components/ParallaxGallery'
import {Dimensions} from 'react-native'
import {Box} from 'react-native-ficus-ui'

const Index = () => {
  let headerHeight = 0.3 * Dimensions.get('window').height
  return (
    <Box flex={1}>
      <ParallaxGallery hero={<Hero headerHeight={headerHeight} />} headerHeight={headerHeight} />
    </Box>
  )
}

export default Index
