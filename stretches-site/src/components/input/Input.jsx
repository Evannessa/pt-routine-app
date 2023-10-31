import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle"
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
    input[type="text"], textarea{
        height: 100%;
    }
    label {
        order: 1;
        z-index: 100;
        ${(props) =>
            props.inputStyle === "floatingLabel" &&
            css`
                position: absolute;
                background: white;
                padding: 0 clamp(0.15rem, 0.5vw + 0.15rem, 0.2rem);
                left: 5%;
                /* bottom: 80%; */
                top: 0;
                transform: translateY(-50%);
                white-space:nowrap;
                font-weight: bold;
                font-size: small;
            `};
    }
    ${props => props.inputStyle === "numberSpinner" && css`
        align-items: center;
        border: unset;
        /* border-radius: 999px; */
        /* border: 1px solid white; */
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0.5em;
        width: 6rem;
            .number__prev, .number__next{
                background-color: transparent;
                border: unset;
                appearance: unset;
                color: white;
                width: 1rem;
                height: 1rem;
            } 
        }
      
        input{
            clip: rect(0 0 0 0);
            clip-path: inset(50%);
            height: 1px;
            overflow: hidden;
            position: absolute;
            white-space: nowrap;
            width: 1px;
        }
        .number{
            &__prev{
                order: 1;
            }
            &-box{
                order: 2;
            }
            &__next{
                order: 3;
            }
        }
        label{
            white-space: nowrap;
            font-size: small;
            opacity: 70%;
            margin-top: 0.45em;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translate(-50%);
        }
    `};
    
	input[type="radio"],
	input[type="checkbox"] {
		display: none;
		position: absolute;
		overflow: hidden;
		clip: rect(0 0 0 0);
		height: 1px;
		width: 1px;
		margin: -1px;
		padding: 0;
		border: 0;

		&+label {
			background-color: transparent;
			border: 1px solid white;
			padding: 0.5em 1em;
			text-align: center;
			border-radius: 9999px;
			z-index: 10;
			display: inline-block;
			vertical-align: middle;
			display: flex;
			align-items: center;
			gap: 0.45rem;

			&:hover {
				cursor: pointer;
			}


		}

		&:checked {
			&+label {
				background-color: hsla(0, 0%, 100%, 0.53);
				color: hsl(343.4, 79.9%, 29.2%);
				font-weight: bold;
				// color: var(--clr-primary-pink)
			}
		}
	}

	.chip.chip-radio {
		position: relative;
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
        className="",
        warningText = "",
        value,
        type,
        setStateFunction,
        parentName = "",
        name,
        id,
        label,
        icon = null,
        hasLabel = false,
        extraProps = {},
        checked,
        inputStyle,
        style,
        tooltip,
        handleBlur,
        variant
    } = props;
    label = hasLabel && label ? label : name
    const [isChecked, setIsChecked] = useState(checked);

    /* const [debouncedValue] = (value, 500); */
    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);
    /** determine whether it's an input or something different */
    // const InputTag = `${type === "textarea" ? "textarea" : "input"}`;

    // const WrapperTag = !wrapped ? "div" : Fragment;
   function handleClick(event){
        let target = event.currentTarget
        let adjust = event.ctrlKey ? 10 : 1
        if(target.id == "number__decrement"){
            adjust *= -1 
        }
        let passValue = value + adjust
        setStateFunction(name, passValue, parentName)
    }
    const debounceFn = useCallback(throttle(handleDebounceFn, 100), []);

    function handleDebounceFn(name, passValue, parentName){
        setStateFunction(name, passValue, parentName)
    }

  /* const debouncedChangeHandler = useCallback(
    debounce(handleChange, 300)
  , []); */
    function handleChange(event) {
        let { value, checked, type } = event.currentTarget;
        let passValue = type === "checkbox" ? checked : value;
        debounceFn(name, passValue, parentName)
        /* setStateFunction(name, passValue, parentName); */
    }
    /* function handleBlur(event){
        if(props.handleBlur){
            props.handleBlur(event)
        }
    } */
    return (
        <StyledInputWrapper 
            inputStyle={inputStyle} 
            style={{ ...style }} 
            className={className} 
            title={tooltip}
        >
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
                /* onChange={handleChange} */
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ ...style }}
                title={tooltip}
            ></StyledInput>
            {(type == "number" && inputStyle == "numberSpinner") && <>
                <div className="number-box">
                    <span>{value}</span>
                </div>
                <button type="button" className="number__next" onClick={handleClick} id="number__increment">
                  <span className="material-symbols-outlined">add</span>
                </button>
                <button type="button" className="number__prev" onClick={handleClick} id="number__decrement">
                  <span className="material-symbols-outlined">remove</span>
                </button>
            </>}
            {hasLabel && (
                <label htmlFor={type === "radio" ? value : id}>
                    {icon && <span className="material-icons">
                        {variant === "showCheck" ? `${value ? "check_circle" : "radio_button_unchecked"}` : icon}
                    </span>}
                    {type === "radio"
                        ? tf.capitalizeFirstLetter(tf.camelCaseToWords(value))
                        : tf.capitalizeFirstLetter(tf.camelCaseToWords(label))}
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
