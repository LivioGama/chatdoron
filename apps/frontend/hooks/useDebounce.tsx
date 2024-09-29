import {useCallback, useEffect, useRef} from 'react'
import debounce from 'lodash.debounce'

const useDebounceFunction = (func, wait = 300) => {
  const funcRef = useRef(func)

  useEffect(() => {
    funcRef.current = func
  }, [func])

  const debouncedFuncRef = useRef(
    debounce((...args) => {
      funcRef.current(...args)
    }, wait),
  )

  useEffect(() => {
    return () => {
      debouncedFuncRef.current.cancel()
    }
  }, [])

  return useCallback((...args) => {
    debouncedFuncRef.current(...args)
  }, [])
}

export default useDebounceFunction
