import { useState, useCallback, ChangeEvent } from 'react'

type UserInputProps = [string, (e: ChangeEvent) => void]

const useInput = (initialValue: string): UserInputProps => {
  const [state, setState] = useState(initialValue)

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event

    setState(value)
  }, [])

  return [state, onChange]
}

export default useInput
