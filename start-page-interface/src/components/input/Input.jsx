import React, { Fragment, useState, useEffect } from "react";
import tf from "../../helpers/formatText";
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
    wrapped = false,
    extraProps = {},
}) {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);
    /** determine whether it's an input or something different */
    const InputTag = `${type === "textarea" ? "textarea" : "input"}`;

    console.log(name, value, "Is wrapped?", wrapped);
    const WrapperTag = !wrapped ? "div" : Fragment;

    function handleChange(event) {
        console.log("clicked?");
        let { value, checked, type } = event.currentTarget;
        let passValue = type === "checkbox" ? checked : value;
        console.log("Passing up", name, passValue, parentName);
        setStateFunction(name, passValue, parentName);
    }
    return (
        <WrapperTag>
            <InputTag
                type={type}
                name={name}
                value={value}
                id={type === "radio" ? value : name}
                {...extraProps}
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
                        ? tf.capitalizeFirstLetter(tf.camelCaseToWords(value))
                        : tf.capitalizeFirstLetter(tf.camelCaseToWords(name))}
                </label>
            )}
        </WrapperTag>
    );
}

export default Input;
