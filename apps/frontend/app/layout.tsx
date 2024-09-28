import Providers from '@/app/Providers'
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
import {SingleChildrenProps} from 'models/interfaces'
import Store from 'models/Store'
import Plausible from 'plausible-tracker'
import {Suspense, useEffect} from 'react'
import {Spinner, useToast} from 'react-native-ficus-ui'
import Toast from 'react-native-toast-message'
import {defaultNavOptions} from 'ui/screenOptions'
import toastConfig from 'ui/toastConfig'

enable$GetSet()

SplashScreen.preventAutoHideAsync()

const FontLoader = ({children}: SingleChildrenProps) => {
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
    const {enableAutoPageviews} = Plausible()
    enableAutoPageviews()
    SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) {
    throw new Promise(resolve => setTimeout(resolve, 100))
  }

  return children
}

const RootLayout = () => {
  Store.toast.set(useToast())

  return (
    <Providers>
      <Suspense fallback={<Spinner size='large' />}>
        <FontLoader>
          <Navigator screenOptions={defaultNavOptions}>
            <Navigator.Screen name='/' />
            <Toast config={toastConfig} />
            <Slot />
          </Navigator>
        </FontLoader>
      </Suspense>
    </Providers>
  )
}

export default RootLayout
