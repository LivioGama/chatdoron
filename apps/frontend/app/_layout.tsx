import Providers from '@/components/Providers'
import {
  Merriweather_400Regular,
  Merriweather_700Bold,
  Merriweather_900Black,
} from '@expo-google-fonts/merriweather'
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans'
import {enable$GetSet} from '@legendapp/state/config/enable$GetSet'
import {useFonts} from 'expo-font'
import {Navigator, Slot, SplashScreen} from 'expo-router'
import 'react-native-gesture-handler'
import {isProd} from 'models/consts'
import Store from 'models/Store'
import Plausible from 'plausible-tracker'
import {useEffect} from 'react'
import {useToast} from 'react-native-ficus-ui'
import {defaultNavOptions} from 'ui/screenOptions'

enable$GetSet()

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    Merriweather_400Regular,
    Merriweather_700Bold,
    Merriweather_900Black,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  })

  useEffect(() => {
    if (!fontsLoaded) return
    if (isProd) {
      const {enableAutoPageviews} = Plausible()
      enableAutoPageviews()
    }
    SplashScreen.hideAsync()
  }, [fontsLoaded])

  return <Providers>{fontsLoaded ? <RootNavigator /> : null}</Providers>
}

export default RootLayout

const RootNavigator = () => {
  Store.toast.set(useToast())
  return (
    <Navigator screenOptions={defaultNavOptions}>
      <Navigator.Screen name='(root)/index' />
      <Slot />
    </Navigator>
  )
}
