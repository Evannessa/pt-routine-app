import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as StyledInputs from "./styled-components/input.styled";
import Select from "./input/Select";
import Form from "./input/Form";
import { FilterGroup } from "./FilterGroup";
import { requests } from "../helpers/requests";

/**
 *
 * @param {*} props
 * @returns - grouped filters
 */
function FilterGroups(props) {
    const baseUrl = "http:localhost:9000/links/display/groups";
    const [filterGroups, setFilterGroups] = useState({
        subGroups: [],
        groupSelector: "and",
    });
    const [allGroups, setAllGroups] = useState();

    useEffect(() => {
        requests.getAll(baseUrl, setAllGroups, "document");
    }, []);

    //filters should be sub-groups
    function updateFilters(propertyName, value) {
        setFilterGroups({ [propertyName]: value });
    }

    let andOrProps = {
        name: "relation",
        options: [
            { name: "and", _id: "and" },
            { name: "or", _id: "or" },
        ],
        setStateFunction: updateFilters,
        value: filterGroups["relation"],
    };

    function addOptions() {
        let groupComponents = [];
        let counter = 1;
        for (let fg of filterGroups.subGroups) {
            groupComponents.push(<FilterGroup key={fg._id}>{fg.name}</FilterGroup>);
            //for every group in the array that's beyond the first one,
            //add the "and or" selector
            if (counter > 1) {
                groupComponents.push(<Select {...andOrProps} />);
            }
            counter += 1;
        }
    }
    // let filterGrouptions = allGroups.map(group => {name: group.categoryName, _id: group._id});

    return (
        <Form>
            <FilterGroup links={props.links} tags={props.tags}></FilterGroup>
            {filterGroups.subGroups.length > 1 && <Select {...andOrProps}></Select>}
            <FilterGroup links={props.links} tags={props.tags}></FilterGroup>
        </Form>
    );
}

export default FilterGroups;
