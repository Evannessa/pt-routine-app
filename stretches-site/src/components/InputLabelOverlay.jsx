import React from "react";
import PropTypes, { propTypes } from "prop-types";
import Input from "./input/Input";
import styled from "styled-components";
function InputLabelOverlay(props) {
    const { extraProps, ...passThroughProps } = props;
    return (
        <div className="input-label-overlay">
            <Input {...passThroughProps}></Input>
            {/* <input
                type={props.type}
                name={props.name}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
            /> */}

            <label htmlFor={props.name}>{props.label || props.name}</label>
        </div>
    );
}

InputLabelOverlay.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
};
export default InputLabelOverlay;
