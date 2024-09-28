import Store from 'models/Store'

export const handleError = (
  e: any,
  description: string | null | any[] = null,
  callback: (() => void) | null = null,
) => {
  process.env.NODE_ENV === 'development' && console.error(e)
  const {show} = Store.toast.get()

  let message = description || 'Error'
  if (e && !description) {
    if (e.response) {
      message = e.response.message
    } else if (e.message) {
      message = e.message
    } else if (e.error) {
      message = e.error.message
    }
  }
  show({
    type: 'error',
    text1: 'Error',
    text2: message as string,
  })
  callback?.()
}
