import {useMediaQuery} from 'react-native-ficus-ui'

const useScreenSize = () => {
  const [isSmallScreen, isTablet, isDesktop, isBigDesktop] = useMediaQuery(
    {
      minWidth: 280,
      maxWidth: 768,
    },
    {
      minWidth: 768,
      maxWidth: 1024,
    },
    {
      minWidth: 1024,
      maxWidth: 1440,
    },
    {
      minWidth: 1440,
    },
  )

  return {
    isSmallScreen,
    isTablet,
    isDesktop,
    isBigDesktop,
    isBigScreen: isDesktop || isBigDesktop,
    isTabletOrDesktop: !isSmallScreen,
  }
}

export default useScreenSize
