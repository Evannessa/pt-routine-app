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
/**
 *
 * @param {*} props
 * @returns - grouped filters
 */
function FilterGroup(props) {
    const baseUrl = "http:localhost:9000/links/display/groups";
    const [filterGroup, setFilterGroup] = useState({
        filters: [],
        groupSelector: "and",
    });
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
    function updateFilters(propertyName, value) {
        setFilterGroup({ [propertyName]: value });
    }

    let andOrProps = {
        name: "relation",
        options: [
            { name: "and", _id: "and" },
            { name: "or", _id: "or" },
        ],
        setStateFunction: updateFilters,
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
                            links={props.links}>
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
                        links={props.links}>
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
        if (filterGroup.groupSelector === "and") {
            //we need to include only the ones that match all of them
            //add all match *arrays* to a single array
            filterGroup.filters.forEach(
                (group) => group.matches && testArray.push(group.matches)
            );
            console.log(testArray);
            console.log(testMatches(testArray));
        } else if (filterGroup.groupSelector === "or") {
            //add all match array items to the same array
            filterGroup.filters.matches.forEach(
                (group) => (testArray = testArray.merge(group.matches))
            );
            console.log(testMatches(testArray));
            //we can include all the ones that match some of them
        }
    }

    // let filterGrouptions = allGroups.map(group => {name: group.categoryName, _id: group._id});

    function addNewFilterGroup(event) {
        function updateSubgroups(document) {
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
            setStateCallback: updateSubgroups,
        };
        requests.axiosRequest(options);
    }

    if (filterGroup) {
        crossFilters();
    }

    return (
        <Form>
            <div style={{ display: "flex", flexDirection: "column" }}>{addOptions()}</div>

            <StyledButtons.TextButton onClick={addNewFilterGroup}>
                <StyledButtons.StyledButtonIconSpan>
                    add
                </StyledButtons.StyledButtonIconSpan>
                Add New Filter Group
            </StyledButtons.TextButton>
        </Form>
    );
}

export default FilterGroup;
