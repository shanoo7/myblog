import React from 'react'
import { useId } from 'react';


const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {

    const id = useId()
    return (
        <div className='mb-2'>
            {
            label &&
                <label className='form-label' htmlFor={id}>
                    {label}
                </label>
            }
            <input className={`form-control ${className}`}
                type={type}
                ref={ref}
                {...props}
                id={id}>
            </input>
        </div>

    )
})
export default Input;
