import React, { useEffect, useState } from "react";
import FilterGroup from "./FilterGroup";
import { Filter } from "./Filter";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Btns from "./styled-components/Buttons.Styled";
import { requests } from "../helpers/requests";
import { StyledNavLink } from "./styled-components/nav.styled";

const StyledCategorySection = styled.section`
    background-color: rgba(0, 0, 0, 0.25);
    padding: 1rem 2rem;
    ul {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        gap: 0.75rem;
        li {
            list-style-type: none;
            a {
                color: white;
                text-decoration: none;
                &:visited {
                    color: var(--clr-accent);
                }
            }
        }
    }
    max-height: 50vh;
    overflow-y: auto;
    border-radius: 10px;
    &::-webkit-scrollbar {
        width: 1rem;
        background-color: var(--clr-primary-deep-dark);
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--clr-accent);
        border-radius: 999px;
    }
`;

function CategoryView(props) {
    // const [groupId, setGroupId] = useState(() => {
    //     //getting stored value
    //     const saved = localStorage.getItem("filterGroupId");
    //     const initialValue = JSON.parse(saved);
    //     return initialValue || "";
    // })

    const [filterGroup, setFilterGroup] = useState(props.defaultValues);
    const [filteredLinks, setFilteredLinks] = useState();

    //initial change on first go-through
    useEffect(() => {
        if (!filterGroup) {
            setFilteredLinks(props.links);
        }
    }, [props.links]);

    function updateFilteredLinks(data) {
        setFilteredLinks(data);
    }
    // useEffect(()=> {
    // 	setFilteredLinks(filterGroup.matches)
    // }, [filterGroup.matches])

    // //when the groupId changes/is fetched from local storage
    // useEffect(() => {
    //     if (groupId) {
    //         let options = {
    //             method: "GET",
    //             pathsArray: ["display", "groups", groupId], //get the group w/ the stored id
    //             setStateCallback: setFilterGroup,
    //         };
    //         requests.axiosRequest(options);
    //         // setFilterGroup
    //     }
    // }, [groupId]);

    // //when the filterGroup state changes, save its ID
    // useEffect(() => {
    //     //store the id for our filter group
    //     if (filterGroup) {
    //         localStorage.setItem("filterGroupId", JSON.stringify(filterGroup._id));
    //     }
    // }, [filterGroup]);

    const linkComponents = filteredLinks
        ? filteredLinks.map((link) => (
              <li key={link._id} role="link">
                  {link.type === "External" ? (
                      <a href={link.url} data-type={link.type}>
                          {link.name}
                      </a>
                  ) : (
                      <Link
                          to={{
                              pathname: `/display/internal/${link._id}/`,
                              //   state: { background: location },
                          }}
                          data-type={link.type}
                          key={link._id}>
                          {link.name}
                      </Link>
                  )}
              </li>
          ))
        : [];
    function handleClick(event) {
        createFilterGroup();
    }
    function createFilterGroup() {
        function setID(document) {
            setFilterGroup(document);
            // setGroupId(document._id);
        }
        let options = {
            method: "POST",
            pathsArray: ["display", "groups"],
            data: {
                categoryName: "New Category",
                groupSelector: "and",
            },
            setStateCallback: setID,
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
            {filterGroup ? (
                <FilterGroup
                    defaultValues={filterGroup}
                    tags={props.tags || []}
                    links={props.links || []}
                    updateFilteredLinks={updateFilteredLinks}
                    displayMode={props.displayMode || false}
                />
            ) : (
                <Btns.TextButton bgColor="transparent" onClick={handleClick}>
                    <Btns.StyledButtonIconSpan>add</Btns.StyledButtonIconSpan>
                    Add New Filter Group
                </Btns.TextButton>
            )}
            <ul>{linkComponents}</ul>
        </StyledCategorySection>
    );
}

export default CategoryView;
