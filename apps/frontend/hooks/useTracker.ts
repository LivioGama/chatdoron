import Plausible from 'plausible-tracker'

const plausible = Plausible({
  domain: process.env.EXPO_PUBLIC_PLAUSIBLE_DOMAIN,
})

const useTracker = () => {
  const track = (event: string, properties?: any) => {
    try {
      plausible.trackEvent(event, properties)
    } catch (e) {
      console.error(e)
    }
  }

  return {track}
}

export default useTracker
