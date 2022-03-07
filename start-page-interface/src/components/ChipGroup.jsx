import React, { Fragment, useEffect, useState } from "react";
import { StyledChipDiv, StyledChipFieldset } from "./styled-components/chips.styled";
import Input from "./input/Input";
import styled from "styled-components";

function ChipGroup(props) {
    const [chipObjects, setChipObjects] = useState([]);

    let groupType = props.groupType || "checkbox";
    let groupName = props.groupName || "";
    console.log("Our filters are now", props.chips);

    useEffect(() => {
        let objects = [];
        if (groupType === "checkbox") {
            for (let chip in props.chips) {
                objects.push({
                    type: groupType,
                    name: chip,
                    [groupType === "checkbox" ? "checked" : "value"]: props.chips[chip],
                });
            }
        } else if (groupType === "radio") {
            for (let radioValue of props.chips) {
                console.log("Radio chips are", radioValue);
                objects.push({
                    type: groupType,
                    name: groupName,
                    checked: props.selectedValue === radioValue,
                    value: radioValue,
                });
            }
        }
        setChipObjects([...objects]);
    }, [props.chips]);

    // useEffect(() => {

    // }, [chipObjects])
    // let chipComponents = Object.keys(props.chips).map((chip) => (
    //     <StyledChipDiv key={chip}>
    //         <Input
    //             type={groupType}
    //             name={chip}
    //             value={props.chips[chip]}
    //             checked={props.chips[chip]}
    //             setStateFunction={props.setStateFunction}
    //             hasLabel={true}
    //             parentName={props.parentName}
    //         />
    //     </StyledChipDiv>
    // ));
    // console.log(chipComponents);
    // console.log("Chip objects are", [...chipObjects]);
    // console.log("Equal?", chipObjects[0].value, props.selectedValue);
    let chipComponents = chipObjects.map((chip) => (
        <StyledChipDiv key={chip.type === "checkbox" ? chip.name : chip.value}>
            <Input
                type={chip.type}
                name={chip.type === "checkbox" ? chip.name : groupName}
                value={chip.value}
                checked={chip.checked}
                setStateFunction={props.setStateFunction}
                hasLabel={true}
                parentName={props.parentName}
            />
        </StyledChipDiv>
    ));
    return (
        <StyledChipFieldset className="chip-group">{chipComponents}</StyledChipFieldset>
    );
}

export default ChipGroup;
