import React from 'react'

const Notification = ({ errorMessage }) => {
    console.log(errorMessage)
    return (
        <div style={{ color: 'red' }}>
            {errorMessage}
        </div>
    )
}

export default Notification