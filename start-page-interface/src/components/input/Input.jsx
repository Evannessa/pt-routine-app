import React from "react";

function Input({ name, type, value, setStateFunction, hasLabel = false }) {
    /** determine whether it's an input or something different */
    const InputTag = `${type === "textarea" ? "textarea" : "input"}`;
    function handleChange(event) {
        let { value, checked, type } = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        let passValue = type === "checkbox" ? checked : value;
        setStateFunction(name, passValue);
    }
    return (
        <div>
            {hasLabel && <label htmlFor={name}>{name}</label>}
            <InputTag
                type={type}
                name={name}
                value={value}
                onChange={handleChange}></InputTag>
        </div>
    );
}

export default Input;
