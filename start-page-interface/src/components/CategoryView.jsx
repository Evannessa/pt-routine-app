import React, { useEffect, useState } from "react";
import FilterGroup from "./FilterGroup";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Btns from "./styled-components/Buttons.Styled";
import { requests } from "../helpers/requests";

const OuterWrapper = styled.section`
    overflow: visible;
    min-height: 10rem;
    position: relative;
    z-index: 10;
    border-radius: 10px;
    padding: 5px;
    /* max-height: 30vh; */
    /* height: fit-content; */
    max-height: ${(props) => (props.expand ? "fit-content" : "30vh")};
    &:before {
        content: "";
        position: absolute;
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        border-radius: inherit;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        /* margin: 1rem; */
        background: linear-gradient(45deg, var(--gradient-color));
        z-index: -1;
    }
`;
const StyledCategorySection = styled.section`
    min-height: 10rem;
    background-color: var(--clr-primary-base-translucent);
    margin-bottom: 1rem;
    height: 100%;
    /* max-height: calc(20vh); */
    /* overflow-y: visible; */
    overflow: visible;
    border-radius: 10px;
    /* position: relative; */
    z-index: 10;
    opacity: 0.99;
    div {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        height: 75%;
        overflow: ${(props) => (props.expand ? "visible" : "hidden")};
    }
    header,
    ul {
        padding: 1rem 2rem;
    }
    ul {
        padding-top: 0;
        margin-top: 0;
    }
    header {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        box-shadow: 0px 7px 9px rgba(0, 0, 0, 0.15);
        background-color: var(--clr-primary-light);
        position: relative;
        z-index: 200;
        height: 25%;
        max-height: 4em;
        * {
            z-index: inherit;
        }
    }
    ul {
        border-radius: inherit;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        max-height: inherit;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        gap: 0.75rem;
        overflow-y: auto;
        background-color: var(--clr-primary-base);
        /* background-color: hsl(var(--clr-primary-base-hsl) / 25%); */
        height: 100%;
        /* overflow-x: auto; */
        &::-webkit-scrollbar {
            width: 0.75rem;
            background-color: var(--clr-primary-base);
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--clr-accent);
            border-radius: 999px;
        }
        &::-webkit-scrollbar-track {
            background-color: var(--clr-primary-base);
        }
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
    const [expand, setExpand] = useState(false);

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

    function toggleExpand(event) {
        setExpand((prevExpand) => !prevExpand);
    }

    return (
        <OuterWrapper expand={expand}>
            <Btns.IconButton
                style={{ position: "absolute", zIndex: 10 }}
                onClick={toggleExpand}>
                expand_more
            </Btns.IconButton>
            <StyledCategorySection expand={expand}>
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
        </OuterWrapper>
    );
}

export default CategoryView;
