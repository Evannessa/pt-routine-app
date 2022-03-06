import React, { Fragment, useEffect, useState } from "react";
import { StyledChipDiv, StyledChipFieldset } from "./styled-components/chips.styled";
import Input from "./input/Input";
import styled from "styled-components";

function ChipGroup(props) {
    const [chipObjects, setChipObjects] = useState([]);
    let groupType = props.groupType || "checkbox";
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
        }
        setChipObjects(objects);
    }, []);

    let chipComponents = chipObjects.map((chip) => (
        <StyledChipDiv key={chip.name}>
            <Input
                type={chip.type}
                name={chip.name}
                value={chip.value}
                checked={chip.checked}
                setStateFunction={props.setStateFunction}
                hasLabel={true}
            />
        </StyledChipDiv>
    ));
    return (
        <StyledChipFieldset className="chip-group">{chipComponents}</StyledChipFieldset>
    );
}

export default ChipGroup;
