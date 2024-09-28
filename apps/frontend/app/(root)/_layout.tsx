import {Stack} from 'expo-router'
import {defaultNavOptions} from 'ui/screenOptions'

const Layout = () => (
  <Stack screenOptions={defaultNavOptions}>
    <Stack.Screen name='index' />
  </Stack>
)

export default Layout
