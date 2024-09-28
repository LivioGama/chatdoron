import {StyleProp, ViewStyle} from 'react-native'
import {BaseToast, ErrorToast, InfoToast} from 'react-native-toast-message'
import {ToastConfig} from 'react-native-toast-message/lib/src/types'

const baseConfig = {
  style: {
    height: 'auto',
  } as StyleProp<ViewStyle>,
  contentContainerStyle: {padding: 15},
  text1NumberOfLines: 3,
  text2NumberOfLines: 0,
  text1Style: {
    fontSize: 17,
  },
  text2Style: {
    fontSize: 15,
  },
}

const toastConfig = {
  success: props => <BaseToast {...props} {...baseConfig} />,
  error: props => <ErrorToast {...props} {...baseConfig} />,
  info: props => <InfoToast {...props} {...baseConfig} />,
} as ToastConfig

export default toastConfig
