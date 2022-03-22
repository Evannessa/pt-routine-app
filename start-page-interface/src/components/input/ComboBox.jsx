import React from "react";
import Input from "./Input";
import Select from "./Select";
import { StyledDatalist } from "../styled-components/input.styled";
function ComboBox(props) {
    const optionComponents = props.options
        ? props.options.map((item, index) => (
              <option key={`${item._id}${index}`} value={item.name}>
                  {item.name}
              </option>
          ))
        : [];
    function handleChange(event) {
        let { value, checked, type } = event.currentTarget;
        let passValue = type === "checkbox" ? checked : value;
        props.setStateFunction(props.name, passValue);
    }
    let inputProps = {
        name: props.name,
        type: "text",
        id: props.id,
        value: props.value,
        checked: props.checked,
        setStateFunction: props.setStateFunction,
        hasLabel: props.hasLabel,
        wrapped: props.wrapped,
        extraProps: {
            list: props.datalistId,
        },
    };
    return (
        <fieldset style={{ backgroundColor: "transparent" }}>
            <input type="text" {...props} onChange={handleChange} />
            <StyledDatalist id={props.datalistId}>{optionComponents}</StyledDatalist>
        </fieldset>
    );
}

export default ComboBox;
