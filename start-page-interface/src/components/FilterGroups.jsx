import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as StyledInputs from "./styled-components/input.styled";
import * as StyledButtons from "./styled-components/Buttons.Styled";
import Select from "./input/Select";
import Form from "./input/Form";
import { FilterGroup } from "./FilterGroup";
import { requests } from "../helpers/requests";
import { ConditionalWrapper } from "./ConditionalWrapper";
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
            if (counter > 1) {
                groupComponents.push(
                    <ConditionalWrapper
                        condition={counter > 1}
                        wrapper={(children) => (
                            <span
                                style={{ display: "inline-flex", alignItems: "center" }}>
                                {children}
                            </span>
                        )}>
                        <Select {...andOrProps} disabled={counter > 2 ? true : false} />
                        <FilterGroup
                            key={fg._id}
                            defaultValues={fg}
                            displayMode={true}
                            tags={props.tags}
                            links={props.links}>
                            {/* {fg.name} */}
                        </FilterGroup>
                    </ConditionalWrapper>
                );
            } else {
                groupComponents.push(
                    <FilterGroup
                        key={fg._id}
                        defaultValues={fg}
                        displayMode={true}
                        tags={props.tags}
                        links={props.links}>
                        {/* {fg.name} */}
                    </FilterGroup>
                );
            }
            //for every group in the array that's beyond the first one,
            //add the "and or" selector

            counter += 1;
        }
        return groupComponents;
    }
    // let filterGrouptions = allGroups.map(group => {name: group.categoryName, _id: group._id});

    function addNewFilterGroup(event) {
        function updateSubgroups(document) {
            let array =
                filterGroups.subGroups.length > 0 ? [...filterGroups.subGroups] : [];
            array.push(document);
            setFilterGroups((prevData) => {
                return {
                    ...prevData,
                    subGroups: array,
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

export default FilterGroups;
