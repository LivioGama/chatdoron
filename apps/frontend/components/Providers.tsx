import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {SingleChildrenProps} from 'models/interfaces'
import {ThemeProvider} from 'react-native-ficus-ui'
import customTheme from 'ui/customTheme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

const Providers = ({children}: SingleChildrenProps) => (
  <ThemeProvider theme={customTheme}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ThemeProvider>
)

export default Providers
