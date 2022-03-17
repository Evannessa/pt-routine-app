import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as StyledInputs from "./styled-components/input.styled";
import * as StyledButtons from "./styled-components/Buttons.Styled";
import Select from "./input/Select";
import Form from "./input/Form";
import { Filter } from "./Filter";
import { requests } from "../helpers/requests";
import { ConditionalWrapper } from "./ConditionalWrapper";
import { matches } from "lodash";
import { Link } from "react-router-dom";
/**
 *
 * @param {*} props
 * @returns - grouped filters
 */
function FilterGroup(props) {
    const baseUrl = "http:localhost:9000/links/display/groups";
    const [filterGroup, setFilterGroup] = useState(
        props.defaultValues || {
            categoryName: "New Category Name",
            filters: [],
            groupSelector: "and",
            matches: [],
        }
    );
    console.log("Default values", props.defaultValues);
    const [allGroups, setAllGroups] = useState();

    useEffect(() => {
        let options = {
            method: "GET",
            pathsArray: ["display", "groups"],
            setStateCallback: setAllGroups,
        };
        requests.axiosRequest(options);
        // requests.getAll(baseUrl, setAllGroups, "document");
    }, []);

    //filters should be sub-groups
    function updateFilterGroup(propertyName, value) {
        setFilterGroup((prevState) => {
            return { ...prevState, [propertyName]: value };
        });
    }

    function updateFilterInGroup(id, value) {
        let newFilters = filterGroup.filters.map((filter) =>
            filter._id === id ? value : filter
        );
        updateFilterGroup("filters", newFilters);
    }

    let andOrProps = {
        name: "relation",
        options: [
            { name: "and", _id: "and" },
            { name: "or", _id: "or" },
        ],
        setStateFunction: updateFilterGroup,
        value: filterGroup["relation"],
    };

    function addOptions() {
        let groupComponents = [];
        let counter = 1;
        for (let fg of filterGroup.filters) {
            if (counter > 1) {
                groupComponents.push(
                    <ConditionalWrapper
                        key={counter}
                        condition={counter > 1}
                        wrapper={(children) => (
                            <span
                                style={{ display: "inline-flex", alignItems: "center" }}>
                                {children}
                            </span>
                        )}>
                        <Select {...andOrProps} disabled={counter > 2 ? true : false} />
                        <Filter
                            key={fg._id}
                            defaultValues={fg}
                            displayMode={true}
                            tags={props.tags}
                            links={props.links}
                            updateParent={updateFilterInGroup}>
                            {/* {fg.name} */}
                        </Filter>
                    </ConditionalWrapper>
                );
            } else {
                groupComponents.push(
                    <Filter
                        key={fg._id}
                        defaultValues={fg}
                        displayMode={true}
                        tags={props.tags}
                        links={props.links}
                        updateParent={updateFilterInGroup}>
                        {/* {fg.name} */}
                    </Filter>
                );
            }
            //for every group in the array that's beyond the first one,
            //add the "and or" selector

            counter += 1;
        }
        return groupComponents;
    }

    //solution from below
    //?https://stackoverflow.com/questions/11076067/finding-matches-between-multiple-javascript-arrays
    function testMatches(matchesArray) {
        console.log("Match array is", matchesArray);
        if (matchesArray.length === 0) {
            return;
        }
        console.log("Length is ", matchesArray, matchesArray.length);
        var finalResult = matchesArray.shift().reduce((totalArray, value) => {
            //if the value is NOT yet the total array and every array in our group also includes the value,
            if (
                !totalArray.includes(value) &&
                matchesArray.every((array) => array.includes(value))
            ) {
                totalArray.push(value);
            }
            return totalArray;
        }, []);
        return finalResult;
    }

    function crossFilters() {
        let testArray = [];
        //add all matches to a single array
        console.log("OUR FILTERS", filterGroup, filterGroup.filters);
        if (filterGroup.groupSelector === "and") {
            //we need to include only the ones that match all of them
            //add all match *arrays* to a single array
            if (filterGroup.filters && Array.isArray(filterGroup.filters)) {
                console.log("Is an array. Testing");
                filterGroup.filters.forEach((filter) => testArray.concat(filter.match));
                console.log(
                    testArray,
                    filterGroup.filters[0].match,
                    testArray.concat(filterGroup.filters[0].match),
                    testMatches(testArray.concat(filterGroup.filters[0].match))
                );
            }
        } else if (filterGroup.groupSelector === "or") {
            //add all match array items to the same array
            filterGroup.filters.forEach(
                (group) => (testArray = testArray.concat(group.match))
            );
            console.log(testMatches(testArray));
            //we can include all the ones that match some of them
        }
        console.log("After filter, test array is", testArray);
    }

    // let filterGrouptions = allGroups.map(group => {name: group.categoryName, _id: group._id});

    function addNewFilter(event) {
        function updateFilters(document) {
            let array = filterGroup.filters.length > 0 ? [...filterGroup.filters] : [];
            array.push(document);
            setFilterGroup((prevData) => {
                return {
                    ...prevData,
                    filters: array,
                };
            });
        }
        let options = {
            method: "POST",
            pathsArray: ["display", "groups"],
            data: { name: "New Filter Group" },
            setStateCallback: updateFilters,
        };
        requests.axiosRequest(options);
    }

    if (filterGroup) {
        crossFilters();
    }
    function reapplyFilter() {
        crossFilters();
    }

    return (
        <Form>
            <h1>{filterGroup.categoryName}</h1>
            <div style={{ display: "flex", flexDirection: "column" }}>{addOptions()}</div>

            <StyledButtons.TextButton onClick={addNewFilter}>
                <StyledButtons.StyledButtonIconSpan>
                    add
                </StyledButtons.StyledButtonIconSpan>
                Add New Filter
            </StyledButtons.TextButton>
            <StyledButtons.ContainedButton onClick={reapplyFilter}>
                Apply Filter
            </StyledButtons.ContainedButton>
        </Form>
    );
}

export default FilterGroup;
