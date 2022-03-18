import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as StyledInputs from "./styled-components/input.styled";
import * as StyledButtons from "./styled-components/Buttons.Styled";
import Select from "./input/Select";
import Form from "./input/Form";
import { Filter, filterOperations } from "./Filter";
import { requests } from "../helpers/requests";
import { ConditionalWrapper } from "./ConditionalWrapper";
import { Link } from "react-router-dom";

export function testIntersection(array1, array2) {
    // "AND" means it matches every single qualifier
    // So we're trying to find items from every filter's array of matching links
    // and find ones that only exist in ALL of them.
    const filteredArray = array1.filter((value) => array2.includes(value));
    return filteredArray;
}
export function testMatches(matchesArray) {
    if (matchesArray.length === 0) {
        return;
    }
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

/**
 *
 * @param {*} props
 * @returns - grouped filters
 */
function FilterGroup(props) {
    const [filterGroup, setFilterGroup] = useState(
        props.defaultValues || {
            categoryName: "New Category Name",
            filters: [],
            groupSelector: "and",
            matches: [],
        }
    );
    const [allGroups, setAllGroups] = useState();
    const [matchingLinks, setMatchingLinks] = useState();
    // const [childFilteredLinks, setChildFilteredLinks] = useState();

    useEffect(() => {
        let options = {
            method: "GET",
            pathsArray: ["display", "groups"],
            setStateCallback: setAllGroups,
        };
        requests.axiosRequest(options);
    }, []);

    // //for when a new child is added, or a child's matching links are changed, or any of our child's filters change, or our groupSelector changes from "and" to "or"
    useEffect(() => {
        crossFilters();
    }, [filterGroup.filters, filterGroup.groupSelector]);

    useEffect(() => {
        if (matchingLinks) {
            props.updateFilteredLinks(matchingLinks);
        }
    }, [matchingLinks]);

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

    // /**
    //  * updates the matching links of the parent from the child
    //  * @param {String} id - the id of the child
    //  * @param {Array} childMatchingLinks - an array of links that match a child filter's conditions
    //  */
    // function updateParentMatchingLinks(id, childMatchingLinks) {
    //     //update the parent's array of matches
    //     setChildFilteredLinks((prevArray) =>
    //         prevArray.map((child) =>
    //             child._id === id
    //                 ? { ...child, links: childMatchingLinks } //return the child with the "links" array updated
    //                 : child
    //         )
    //     ); // else just return the child itself
    //     //this will trigger a useEffect which should reapply all the filters of the children
    // }

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

    // //solution from below
    // //?https://stackoverflow.com/questions/11076067/finding-matches-between-multiple-javascript-arrays

    function crossFilters() {
        let testArray = [];
        filterGroup.filters.forEach((filter) => {
            testArray.push(
                filterOperations.getMatches(
                    props.links,
                    filter.propertyChoice,
                    filter.match,
                    false
                )
            );
        });

        //add all matches to a single array
        if (filterGroup.groupSelector === "and") {
            //we need to include only the ones that match all of them
            //add all match *arrays* to a single array
            let matchingLinks = testMatches(testArray);
            setMatchingLinks(matchingLinks);
            // if (filterGroup.filters && Array.isArray(filterGroup.filters)) {
            //     filterGroup.filters.forEach((filter) => testArray.push(filter.match));
            // }
        } else if (filterGroup.groupSelector === "or") {
            //add all match array items to the same array
            filterGroup.filters.forEach(
                (group) => (testArray = testArray.concat(group.match))
            );
            //we can include all the ones that match some of them
        }
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
            method: "PATCH",
            pathsArray: ["display", "groups", filterGroup._id],
            data: { categoryName: "New Filter" },
            setStateCallback: updateFilters,
        };
        requests.axiosRequest(options);
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
