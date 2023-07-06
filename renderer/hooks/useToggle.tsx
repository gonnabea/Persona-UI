import { useState, useCallback } from 'react'

type ToggleProps = [boolean, () => void]

const useToggle = (initialValue: boolean): ToggleProps => {
  const [state, setState] = useState(initialValue)

  const onClick = useCallback(() => {
    setState(!state)
  }, [state])

  return [state, onClick]
}

export default useToggle
