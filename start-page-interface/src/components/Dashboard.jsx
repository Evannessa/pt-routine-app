import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { requests } from "../helpers/requests";
import * as Layout from "./styled-components/layout.styled";
import CategoryView from "./CategoryView";
const StyledCategoryGrid = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
`;

const StyledHeading = styled.h1`
    font-size: 3rem;
    color: var(--clr-accent-pink);
    letter-spacing: 0.15ch;
`;

function Dashboard() {
    const [categories, setCategories] = useState();
    const [filteredViews, setFilteredViews] = useState();
    const [links, setLinks] = useState();
    const [tags, setAllTags] = useState();

    useEffect(() => {
        let options = {
            method: "GET",
            pathsArray: ["display", "groups"],
            setStateCallback: setFilteredViews,
        };
        requests.axiosRequest(options);
        let linkOptions = {
            method: "GET",
            pathsArray: ["display"],
            setStateCallback: setLinks,
        };
        requests.axiosRequest(linkOptions);
        let tagOptions = {
            method: "GET",
            pathsArray: ["display", "tags"],
            setStateCallback: setAllTags,
        };
        requests.axiosRequest(tagOptions);
    }, []);

    let categoryComponents = filteredViews
        ? filteredViews.map((filterGroup) => (
              <CategoryView
                  key={filterGroup._id}
                  defaultValues={filterGroup}
                  links={links}
                  tags={tags}
                  displayMode={false}></CategoryView>
          ))
        : [];

    return (
        <div>
            <StyledHeading>Dashboard</StyledHeading>
            {links ? (
                <StyledCategoryGrid>{categoryComponents}</StyledCategoryGrid>
            ) : (
                <p style={{ color: "var(--clr-accent)" }}>Loading...</p>
            )}
        </div>
    );
}

export default Dashboard;
