import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { StyledChipBox } from "../styled-components/input.styled";
// const StyledInput = styled
function Input({
    name,
    type,
    value,
    checked,
    setStateFunction,
    hasLabel = false,
    icon = null,
    parentName = "",
}) {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);
    /** determine whether it's an input or something different */
    const InputTag = `${type === "textarea" ? "textarea" : "input"}`;

    function camelCaseToWords(string) {
        return string.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function handleChange(event) {
        console.log("clicked?");
        let { value, checked, type } = event.currentTarget;
        let passValue = type === "checkbox" ? checked : value;
        console.log("Passing up", name, passValue, parentName);
        setStateFunction(name, passValue, parentName);
    }
    return (
        <Fragment>
            <InputTag
                type={type}
                name={name}
                value={value}
                id={type === "radio" ? value : name}
                checked={isChecked}
                onChange={handleChange}></InputTag>
            {hasLabel && (
                <label
                    htmlFor={type === "radio" ? value : name}
                    style={{
                        backgroundColor: isChecked ? "cornflowerblue" : "transparent",
                        color: isChecked ? "white" : "cornflowerblue",
                        fontWeight: isChecked ? "bold" : "regular",
                    }}>
                    {icon && <span className="material-icons">{icon}</span>}
                    {type === "radio"
                        ? capitalizeFirstLetter(camelCaseToWords(value))
                        : capitalizeFirstLetter(camelCaseToWords(name))}
                </label>
            )}
        </Fragment>
    );
}

export default Input;
