import {Image} from 'expo-image'
import {Dimensions} from 'react-native'
import {Box, Center, Stack, Text, VStack} from 'react-native-ficus-ui'

export const Hero = ({headerHeight}: {headerHeight: number}) => {
  const pictureSize = Math.min(headerHeight, Dimensions.get('window').width) * 0.7

  return (
    <Center h={headerHeight} bg='#5D6E7A' w='100%' p={{base: 32, md: 16}}>
      <Box w='100%' maxW={1280}>
        <Stack
          flexDirection={{base: 'column', lg: 'row'}}
          justify='space-between'
          w='100%'
          spacing={32}
          alignItems='center'>
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
          <VStack alignItems='center' spacing={24}>
            <Text
              fontSize={48}
              color='accent'
              fontFamily='Merriweather_400Regular'
              textAlign={{base: 'center', md: 'left'}}>
              Chat d'Oron
            </Text>
            <Text
              fontSize={24}
              color='accent'
              fontFamily='OpenSans_400Regular'
              textAlign={{base: 'center', md: 'left'}}>
              Notre plus grand rêve est que tu aies la vie que tu mérites
            </Text>
          </VStack>
        </Stack>
      </Box>
    </Center>
  )
}
