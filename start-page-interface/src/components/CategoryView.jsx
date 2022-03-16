import React, { useEffect, useState } from "react";
import FilterGroup from "./FilterGroup";
import { Filter } from "./Filter";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Btns from "./styled-components/Buttons.Styled";
import { requests } from "../helpers/requests";

const StyledCategorySection = styled.section`
    background-color: #212121;
`;

function CategoryView(props) {
    const [groupId, setGroupId] = useState(() => {
        //getting stored value
        const saved = localStorage.getItem("filterGroupId");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });

    const [filterGroup, setFilterGroup] = useState();
    const [filteredLinks, setFilteredLinks] = useState();

    //initial change on first go-through
    useEffect(() => {
        setFilteredLinks(props.links);
    }, []);

    //when the groupId changes/is fetched from local storage
    useEffect(() => {
        if (groupId) {
            let options = {
                method: "GET",
                pathsArray: ["display", "groups", groupId], //get the group w/ the stored id
                setStateCallback: setFilterGroup,
            };
            requests.axiosRequest(options);
            // setFilterGroup
        }
    }, [groupId]);

    //when the filterGroup state changes, save its ID
    useEffect(() => {
        //store the id for our filter group
        if (filterGroup) {
            localStorage.setItem("filterGroupId", JSON.stringify(filterGroup._id));
        }
    }, [filterGroup]);

    const linkComponents = filteredLinks
        ? filteredLinks.map((link) => <div key={link._id}>{link.name}</div>)
        : [];
    function handleClick(event) {
        createFilterGroup();
    }
    function createFilterGroup() {
        let options = {
            method: "POST",
            pathsArray: ["display", "groups"],
            data: {
                categoryName: "New Category",
                groupSelector: "and",
            },
            setStateCallback: setFilterGroup,
        };
        requests.axiosRequest(options);
    }
    function updateCategory() {
        let options = {
            method: "PATCH",
            pathsArray: ["display", "groups"],
        };
    }

    return (
        <StyledCategorySection>
            <Btns.TextButton bgColor="transparent" onClick={handleClick}>
                <Btns.StyledButtonIconSpan>add</Btns.StyledButtonIconSpan>
                Add New Filter Group
            </Btns.TextButton>
        </StyledCategorySection>
    );
}

export default CategoryView;
