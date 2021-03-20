import React from 'react'

const Button = ({type, onClick, text}) =>
    <div>
        <button type={type} onClick={onClick}>{text}</button>
    </div>

export default Button