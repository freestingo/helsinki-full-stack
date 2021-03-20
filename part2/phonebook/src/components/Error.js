import React from 'react'

const Error = ({message}) => {
    const notificationStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    return !message
        ? message
        :
            <div style={notificationStyle}>
                {message}
            </div>
}      

export default Error