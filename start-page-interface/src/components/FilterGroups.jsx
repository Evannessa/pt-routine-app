import React, { useState, useEffect } from "react";
import styled from "styled-components";

function FilterGroups(props) {
    //any vs all -- some vs every
    const matchFunctions = {
        name: filterStringProperty,
        url: filterStringProperty,
        tags: filterArrayProperty,
    };
    const [filters, setFilters] = useState({});

    function filterStringProperty(property, match) {
        return property === match;
    }
    function filterArrayProperty(property, match) {
        return property.some((item) => filterStringProperty(item, match));
    }

    function all(array, property, conditionToMeet) {
        return array.every(matchFunctions[property](property, conditionToMeet));
    }
    function any(array, property, conditionToMeet) {
        return array.some(matchFunctions[property](property, conditionToMeet));
    }
    return <form>{}</form>;
}

export default FilterGroups;
