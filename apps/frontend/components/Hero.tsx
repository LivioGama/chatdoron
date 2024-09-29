import {Dimensions} from 'react-native'
import {Text, VStack} from 'react-native-ficus-ui'

export const Hero = () => (
  <VStack h={Dimensions.get('window').height} justifyContent='center'>
    <Text>The Story of Merguez</Text>
    <Text>A Cat's Journey</Text>
  </VStack>
)
