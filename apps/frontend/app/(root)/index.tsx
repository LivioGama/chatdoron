import Gallery from '@/components/Gallery'
import {Hero} from '@/components/Hero'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import {Box, Text} from 'react-native-ficus-ui'

const Index = () => (
  <Box flex={1} bg='blue'>
    <ParallaxScrollView hero={<Hero />} headerHeight={200}>
      <Text> Hello</Text>
      <Gallery />
    </ParallaxScrollView>
  </Box>
)

export default Index
