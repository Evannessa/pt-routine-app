import React, { useEffect, useState } from "react";
import FilterGroup from "./FilterGroup";
import { Filter } from "./Filter";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Btns from "./styled-components/Buttons.Styled";
import { requests } from "../helpers/requests";
import { StyledNavLink } from "./styled-components/nav.styled";

const StyledCategorySection = styled.section`
    min-height: 10rem;
    background-color: rgba(0, 0, 0, 0.25);
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    ul {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        gap: 0.75rem;
        li {
            list-style-type: none;
            a,
            Link {
                color: var(--clr-accent-lighter);
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
    &::-webkit-scrollbar-track {
        background-color: var(--clr-primary-deep-dark);
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
                    displayMode={props.displayMode || false}
                />
            ) : (
                <Btns.TextButton bgColor="transparent" onClick={handleClick}>
                    <Btns.StyledButtonIconSpan>add</Btns.StyledButtonIconSpan>
                    Add New Filter Group
                </Btns.TextButton>
            )}
            {/* <ul>{linkComponents}</ul> */}
        </StyledCategorySection>
    );
}

export default CategoryView;
