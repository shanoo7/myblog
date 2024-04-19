import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props

}, ref) {
    const id = useId()
    return (
        <div className='container-fluid '>

            {label && <label className='' htmlFor={id}></label>}

            <select className={`${className}`} id={id} ref={ref} {...props}>
                {options?.map((option) => (
                <option className='' key={option} value={option}>
                    {option}
                </option>
                ))}
            </select>

        </div>
    )
}

export default React.forwardRef(Select);
