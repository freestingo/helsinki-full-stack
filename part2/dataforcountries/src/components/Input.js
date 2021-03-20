import React from 'react'

const Input = ({text, value, onChange}) =>
    <div className="input">
        {text}
        <input
            value={value}
            onChange={onChange}
        />
    </div>


export default Input