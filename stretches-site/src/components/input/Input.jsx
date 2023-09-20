import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import tf from "../../helpers/formatText";

// #region Styled Components
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

export const StyledInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    input,
    textarea {
        order: 2;
        border-color: ${(props) => props.borderColor || "white"};
    }
    label {
        order: 1;
        z-index: 100;
        ${(props) =>
            props.inputStyle === "floatingLabel" &&
            css`
                position: absolute;
                background: white;
                padding: 0 clamp(0.25rem, 0.5vw + 0.25rem, 0.5rem);
                left: 5%;
                bottom: 80%;
            `};
    }
`;
StyledInputWrapper.displayName = "StyledInputWrapper";


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
export const StyledInput = styled.input.attrs((props) => ({
    type: props.type,
    id: props.id,
}))`
    ${(props) =>
        props.inputStyle === "chip" &&
        css`
            & + label {
                background-color: ${(props) => (props.checked ? "cornflowerblue" : "transparent")};
                color: ${(props) => (props.checked ? "white" : "cornflowerblue")};
            }
        `};
    ${(props) =>
        props.inputStyle === "floatingLabel" &&
        css`
            order: 2;
            + label {
                order: 1;
                background-color: inherit;
                position: absolute;
            }
        `};

    ${(props) =>
        props.disabled &&
        css`
            cursor: not-allowed;
            & + label {
                opacity: 50%;
                cursor: not-allowed;
            }
        `}
`;
StyledInput.displayName = "StyledInput";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// #endregion
function Input(props) {
    let {
        // wrapped = true,
        warningText = "",
        value,
        type,
        setStateFunction,
        parentName = "",
        name,
        id,
        icon = null,
        hasLabel = false,
        extraProps = {},
        checked,
        inputStyle,
        style,
    } = props;
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);
    /** determine whether it's an input or something different */
    // const InputTag = `${type === "textarea" ? "textarea" : "input"}`;

    // const WrapperTag = !wrapped ? "div" : Fragment;

    function handleChange(event) {
        let { value, checked, type } = event.currentTarget;
        let passValue = type === "checkbox" ? checked : value;
        setStateFunction(name, passValue, parentName);
    }
    return (
        <StyledInputWrapper inputStyle={inputStyle} style={{ ...style }}>
            <StyledInput
                as={type === "textarea" ? "textarea" : "input"}
                className="input-label-overlay"
                data-testid="input-component"
                type={type}
                name={name}
                value={value}
                id={id}
                // id={type === "radio" ? value : name}
                {...extraProps}
                checked={isChecked}
                disabled={props.disabled}
                onChange={handleChange}
                style={{ ...style }}
            ></StyledInput>
            {hasLabel && (
                <label htmlFor={type === "radio" ? value : id}>
                    {icon && <span className="material-icons">{icon}</span>}
                    {type === "radio"
                        ? tf.capitalizeFirstLetter(tf.camelCaseToWords(value))
                        : tf.capitalizeFirstLetter(tf.camelCaseToWords(name))}
                </label>
            )}
            <span className="validation warning" style={{ position: "absolute", left: "110%", color: "red" }}>
                {warningText}
            </span>
        </StyledInputWrapper>
    );
}

Input.defaultPropTypes = {
    warningText: "Invalid input",
    hasLabel: false,
    icon: "",
    parentName: "",
    wrapped: false,
    extraProps: {},
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]).isRequired,
    checked: PropTypes.bool,
    setStateFunction: PropTypes.func.isRequired,
    hasLabel: PropTypes.bool.isRequired,
    warningText: PropTypes.string,
    icon: PropTypes.string,
    parentName: PropTypes.string,
    wrapped: PropTypes.bool,
    extraProps: PropTypes.object,
};
export default Input;
