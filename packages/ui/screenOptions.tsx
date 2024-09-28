import {NativeStackNavigationOptions} from '@react-navigation/native-stack'

const defaultNavOptions: NativeStackNavigationOptions = {
  gestureEnabled: true,
}

const navAsModalOptions: NativeStackNavigationOptions = {
  presentation: 'fullScreenModal',
  animation: 'default',
}

export {defaultNavOptions, navAsModalOptions}
