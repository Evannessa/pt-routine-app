import React, { useEffect, useState } from "react";
import { StyledSelect, StyledDatalist } from "../styled-components/input.styled";

function Select(props) {
    const [selected, setSelected] = useState(props.value);
    const [suggestions, setSuggestions] = useState(props.options);
    let InputTag = props.isDatalist ? StyledDatalist : StyledSelect;
    const optionComponents = suggestions
        ? suggestions.map((item, index) => (
              <option key={item._id + index} value={item.name}>
                  {item.name}
              </option>
          ))
        : [];
    useEffect(() => {
        setSuggestions(props.options);
        setSelected(props.value);
    }, [props.options, props.value]);

    function filterSuggestions(event) {
        let match = event.currentTarget.value;
        console.log("Suggestion filter?", match, props.options);
        setSuggestions(
            props.options.filter((option) =>
                option.name.toLowerCase().includes(match.toLowerCase())
            )
        );
    }
    function handleChange(event) {
        let { value, checked, type } = event.currentTarget;
        console.log("We selected", value, "Pushing to", [...props.value]);
        if (props.multiple) {
            let newArray = [...props.value];
            newArray.push(value);
            value = newArray;
            console.log(value);
        }
        let passValue = type === "checkbox" ? checked : value;
        props.setStateFunction(props.name, passValue);
    }
    return (
        <fieldset
            style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "transparent",
            }}>
            {props.multiple && (
                <input
                    type="text"
                    name="filterSuggestions"
                    onChange={filterSuggestions}
                />
            )}
            <InputTag
                id={props.isDatalist ? props.datalistId : ""}
                onChange={handleChange}
                value={props.value}
                multiple={props.multiple}>
                {optionComponents}
            </InputTag>
        </fieldset>
    );
}

export default Select;
