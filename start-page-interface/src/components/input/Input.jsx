import React, { Fragment } from "react";

function Input({
    name,
    type,
    value,
    checked,
    setStateFunction,
    hasLabel = false,
    icon = null,
}) {
    /** determine whether it's an input or something different */
    const InputTag = `${type === "textarea" ? "textarea" : "input"}`;

    console.log("Checked:", name, checked);

    function camelCaseToWords(string) {
        return string.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function handleChange(event) {
        let { value, checked, type } = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        let passValue = type === "checkbox" ? checked : value;
        setStateFunction(name, passValue);
    }
    return (
        <Fragment>
            <InputTag
                type={type}
                name={name}
                value={value}
                checked={checked}
                onChange={handleChange}></InputTag>
            {hasLabel && (
                <label htmlFor={name}>
                    {icon && <span className="material-icons">{icon}</span>}
                    {capitalizeFirstLetter(camelCaseToWords(name))}
                </label>
            )}
        </Fragment>
    );
}

export default Input;
