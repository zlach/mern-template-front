import { useEffect, useRef } from 'react'

export const useUpdate = (fn, deps = []) => {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) {
      return fn()
    }
    didMountRef.current = true
  }, deps)
}
