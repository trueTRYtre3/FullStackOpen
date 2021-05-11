import { useState } from 'react'

export const useField = (name) => {
    const [value, setValue] = useState('')

    const onChange = event => {
        setValue(event.target.value)
    }

    const reset = (val=false) => {
        if (val) setValue('')
    }

    return { 
        reset,
        main: {
            name, 
            value, 
            onChange,
        }
    }
}
