import React from "react";
import { StyledSelect, StyledDatalist } from "../styled-components/input.styled";

function Select(props) {
    let InputTag = props.isDatalist ? StyledDatalist : StyledSelect;
    const optionComponents = props.options
        ? props.options.map((item) => (
              <option key={item._id} value={item.name}>
                  {item.name}
              </option>
          ))
        : [];
    function handleChange(event) {
        let { value, checked, type } = event.currentTarget;
        let passValue = type === "checkbox" ? checked : value;
        props.setStateFunction(props.name, passValue);
    }
    return (
        <InputTag
            id={props.isDatalist ? props.datalistId : ""}
            onChange={handleChange}
            value={props.value}>
            {optionComponents}
        </InputTag>
    );
}

export default Select;
