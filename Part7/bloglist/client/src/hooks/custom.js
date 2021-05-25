import { useState } from 'react'

export const useField = type => {
  const [value, changeValue] = useState('')

  const onChange = event =>
    changeValue(event.target.value)

  const reset = () => changeValue('')

  return {
    reset,
    main: {
      type,
      onChange,
      value
    }
  }
}
