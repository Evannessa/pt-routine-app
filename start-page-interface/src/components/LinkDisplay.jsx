import Avatar from "boring-avatars";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { requests } from "../helpers/requests";
import ChipGroup from "./ChipGroup";
import Form from "./input/Form";
import Input from "./input/Input";
import FilterGroups from "./FilterGroups";
import CategoryView from "./CategoryView";
import * as Buttons from "./styled-components/Buttons.Styled";
import {
    ButtonGroup,
    ContainedButton,
    StyledSplitButtonWrapper,
    StyledSplitButtonPrimary,
    StyledSplitButtonOverflow,
    StyledSplitButtonDropdown,
} from "./styled-components/Buttons.Styled";
import {
    CardComponent,
    StyledCardBody,
    StyledCardFooter,
    StyledCardHeader,
    StyledCardHorizontal,
    StyledCardSidebar,
    StyledCardSidebarLeft,
} from "./styled-components/cards.styled";
import * as Layout from "./styled-components/layout.styled";
import {
    StyledContent,
    StyledMain,
    StyledSidebar,
} from "./styled-components/layout.styled";
import * as StyledNav from "./styled-components/nav.styled";
import TagChips from "./TagChips";

// #region styledComponents
const StyledLinkContainer = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    min-height: fit-content;
    /* display: grid;
    /* grid-auto-flow: row;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(6, 1fr); */
    gap: 1rem;
    width: 100%;
    /* max-width: 90vw; */
    min-height: 200vh;
    overflow: hidden;
`;

// #endregion

function LinkDisplay(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    // single-time read
    const sParams = Object.fromEntries([...searchParams]);
    const params = useParams();
    const location = useLocation();
    let id = Object.keys(params).length > 0 ? params.id : "new";
    const urlBase = "http://localhost:9000/links/display";
    const createBase = "http://localhost:9000/links/create";
    const [links, setLinks] = useState();
    const [filteredLinks, setFilteredLinks] = useState();
    const [formData, setFormData] = React.useState({
        jsonData: "",
        search: "",
        searchFilters: { tags: true, titles: true, urls: false },
    });
    const [allTags, setAllTags] = React.useState([]);
    const [queryTags, setQueryTags] = React.useState([]);
    const matchFunctions = {
        name: filterStringProperty,
        url: filterStringProperty,
        tags: filterArrayProperty,
    };

    function filterStringProperty(property, match, matchAll = false) {
        //match all should return an EXACT match
        if (matchAll) {
            return property === match;
        } else {
            //match all should return a non-exact, case-insensitive match that includes portions of the word
            console.log(property);
            return property.toLowerCase().includes(match.toLowerCase());
        }
    }
    /**
     *
     * @param {*} childArray - the nested array of items
     * @param {*} property -
     * @param {*} match
     * @returns
     */
    function filterArrayProperty(childArray, match, matchAll, childProperty = "") {
        let nameArray = [];
        if (childProperty) {
            nameArray = childArray.map((item) => item[childProperty].toLowerCase());
        } else {
            nameArray = childArray.map((item) => item.toLowerCase()); //get names of items
        }
        if (matchAll && match instanceof Array) {
            let allIncluded = match.every((matchString) =>
                nameArray.includes(matchString.toLowerCase())
            );
            return allIncluded;
        }
        //use some to make sure only some of the values in the child array match
        else {
            let someIncluded = match.some((matchString) =>
                nameArray.includes(matchString.toLowerCase())
            );
            return someIncluded;
        }
    }
    const getNestedObject = (nestedObject, pathArray) => {
        return pathArray.reduce(function (obj, key) {
            if (obj && obj[key] !== undefined) {
                console.log(obj, key, obj[key]);
                return obj[key];
            }
            return undefined;
        }, nestedObject);
    };
    function breakDownPropertyName(propertyName) {
        return propertyName.split(".");
    }

    function getMatches(
        array,
        property,
        conditionToMeet,
        matchAll = false,
        childProperty = ""
    ) {
        //for the strings, match all could be ""
        // let propertyPathArray = breakDownPropertyName(property);
        // let propertyName = propertyPathArray[0];
        // propertyPathArray.push(0);
        let propertyName = property;

        return array.filter((item, index) => {
            // let newPathString = property.replace("index", index);
            // console.log(newPathString);
            // propertyPathArray = breakDownPropertyName(newPathString);
            // propertyPathArray = propertyPathArray.map((string) =>
            //     isNaN(Number(string)) ? string : Number(string)
            // );
            // console.log(propertyPathArray);
            return matchFunctions[propertyName](
                item[propertyName],
                conditionToMeet,
                matchAll,
                childProperty
            );
        });
    }

    useEffect(() => {
        requests.axiosRequest("GET", ["display"], {}, setLinks);
        requests.axiosRequest("GET", ["display", "tags"], {}, setAllTags);
        // requests.getAll(`${urlBase}`, setLinks, "links");
        // requests.getAll(`${urlBase}/tags`, setAllTags, "tags");
    }, []);

    /**
     * When the links or the search data changes, update to see what has been filtered
     */
    useEffect(() => {
        if (!links) {
            return;
        }
        // console.log(any(links, "tags", "gaming"));
        // console.log(any(links, "tags", ["gaming", "Test", "Action"]));
        console.log(
            getMatches(links, "tags", ["gaming", "Test", "Action"], true, "name"),
            getMatches(links, "name", "Kevin")
        );

        let filtered;
        //TODO: refactor to backend later
        // //no form data, so no filters
        // const currentParams = Object.fromEntries([...searchParams]);
        // console.log(currentParams);
        // setSearchParams({ name: formData.search });
        if (formData.search === "") {
            filtered = [];
            setFilteredLinks(links);
        } else {
            filtered = formData.searchFilters.tags
                ? links.filter((link) => {
                      //filter all the links
                      return link.tags.some((tag) => {
                          //where this specific link's tags names include
                          //the stuff in the search
                          return queryTags.some((el) =>
                              tag.name.toLowerCase().includes(el.toLowerCase())
                          );
                      });
                  })
                : [];
            //if the name filter is selected
            let filteredNames = formData.searchFilters.titles
                ? links.filter((link) => {
                      return queryTags.some((el) =>
                          link.name.toLowerCase().includes(el.toLowerCase())
                      );
                  })
                : [];

            //if the url filter is selected
            let filteredUrls = formData.searchFilters.urls
                ? links.filter((link) => {
                      return queryTags.some((el) =>
                          link.url.toLowerCase().includes(el.toLowerCase())
                      );
                  })
                : [];
            filtered = [...filtered, ...filteredNames, ...filteredUrls];
            filtered = [...new Set(filtered)];

            //no matches found found, so filtered links will be empty
            if (filtered.length === 0) {
                setFilteredLinks([]);
            } else {
                setFilteredLinks(filtered);
            }
        }
    }, [links, queryTags, formData.search, formData.searchFilters]);

    useEffect(() => {
        //filter tags, then set query tags to equal the filtered tags
        // tags are an array, and you need the tag names
        //we want to find the text in the search that matches tag names
        //but also names/urls
        let searchData = formData.search;
        // let quotePattern = /('(((\\)+(')?)|([^']))*')|("(((\\)+(")?)|([^"]))*")/g;
        // let exact = searchData.match(quotePattern);
        // console.log(exact);
        let searchArray = searchRegexPattern();
        // let searchArray = formData.search.split(" "); //split by space characters
        // console.log(searchArray);
        setQueryTags(searchArray);
    }, [formData.search]);

    useEffect(() => {}, [searchParams]);

    // let filterChips = searchFilters.map();

    function createRegex(word, count) {
        let pattern = /\b(bet)/;
    }
    function searchRegexPattern() {
        let searchData = formData.search.toString();
        //1. extract items in quotes from the string first
        // // let quotePattern = /"(.*?)"/;

        //then split the remaining words based on delimeters space or comma
        let searchKeywords = searchData.split(/[\s,]+/);
        //combine in array and match each with tags and name, using boundaries to match partial or whole
        return searchKeywords;
    }
    function downloadJSON() {
        console.log(JSON.stringify(links));
    }
    function uploadJSON() {
        console.log(`uploading JSON`);
        requests.createMultiple(urlBase, formData.jsonData, "object");
    }

    function updateFormData(name, value, parentName) {
        let escapedValue;
        if (name === "search") {
            escapedValue = escapeRegExp(value);
        }
        setFormData((prevFormData) => {
            let updateObject = {};
            if (parentName) {
                let property = { ...formData[parentName] };
                property[name] = value;
                console.log("Update?", { ...prevFormData, [parentName]: property });
                return {
                    ...prevFormData,
                    [parentName]: property,
                };
            }
            return {
                ...prevFormData,
                [name]: name === "search" ? escapedValue : value,
            };
        });
    }

    function escapeRegExp(string) {
        return string.replaceAll('"', "'"); // $& means the whole matched string
    }

    function deleteLink(id) {
        requests.deleteObject(id, urlBase, setLinks, links, "link");
    }

    const linkComponents = filteredLinks
        ? filteredLinks.map((link) => (
              <StyledCardHorizontal
                  key={link._id}
                  highlighted={link._id === params.id ? true : false}>
                  <StyledCardHeader>
                      <h2>
                          {link.name}
                          <StyledNav.StyledRouterLink
                              color="white"
                              to={`/display/${link._id}`}
                              className="material-icons">
                              edit
                          </StyledNav.StyledRouterLink>
                      </h2>
                  </StyledCardHeader>
                  <StyledCardSidebarLeft>
                      <Avatar
                          size="3rem"
                          variant="marble"
                          colors={["#02797E", "#FFA689", "#D62B58", "#BF2063", "#572F4F"]}
                      />
                  </StyledCardSidebarLeft>
                  <StyledCardBody></StyledCardBody>
                  <StyledCardFooter>
                      <CardComponent>
                          {link.tags.map((tag) => {
                              return (
                                  <TagChips
                                      key={tag._id}
                                      tag={tag}
                                      tagName={tag.name}></TagChips>
                              );
                          })}
                      </CardComponent>
                  </StyledCardFooter>
                  <StyledCardSidebar>
                      {link.type === "External" ? (
                          <a href={link.url} className="material-icons">
                              arrow_forward
                          </a>
                      ) : (
                          <Link
                              className="material-icons"
                              to={{
                                  pathname: `/display/internal/${link._id}/`,
                                  //   state: { background: location },
                              }}>
                              arrow_forward
                          </Link>
                      )}
                      {/* <IconButton
                          className="material-icons"
                          onClick={(e) => deleteLink(link._id)}>
                          delete
                      </IconButton> */}
                  </StyledCardSidebar>
              </StyledCardHorizontal>
          ))
        : [];

    return (
        <Layout.StyledOuterMain>
            <Layout.StyledHeader>
                {/* <CategoryView links={links || []} tags={allTags || []} /> */}
                <FilterGroups links={links || []} tags={allTags || []} />

                <Form direction="row" justify="center" align="center">
                    <Input
                        name="search"
                        type="text"
                        value={formData.search}
                        checked={formData.search}
                        setStateFunction={updateFormData}
                        hasLabel={true}></Input>
                    <ChipGroup
                        chips={formData.searchFilters}
                        setStateFunction={updateFormData}
                        parentName="searchFilters"></ChipGroup>
                </Form>
                <StyledSplitButtonWrapper>
                    <StyledSplitButtonPrimary bgColor="cornflowerblue">
                        add
                    </StyledSplitButtonPrimary>
                    <StyledSplitButtonOverflow>arrow_drop_down</StyledSplitButtonOverflow>
                </StyledSplitButtonWrapper>
                <StyledNav.StyledRouterLink to="/create/new">
                    Create New <span className="material-icons">add</span>
                </StyledNav.StyledRouterLink>

                {/* <Form action="" submitFunction={uploadJSON} submitText="Upload JSON">
                    <Input
                        type="textarea"
                        setStateFunction={updateFormData}
                        // setStateFunction={updateFormData}
                        name="jsonData"
                        value={formData.jsonData}
                        hasLabel={true}></Input>
                </Form>
                <ButtonGroup>
                    <CircleIconButton
                        className="material-icons"
                        btnStyle="contained"
                        color="white"
                        bgColorAlt="white"
                        bgColor="cornflowerblue"
                        colorAlt="cornflowerblue"
                        onClick={(event) => downloadJSON()}>
                        file_download
                    </CircleIconButton>
                </ButtonGroup> */}
            </Layout.StyledHeader>
            <StyledMain>
                <StyledSidebar>{linkComponents}</StyledSidebar>

                <StyledContent>
                    <ButtonGroup>
                        <StyledNav.TabLink
                            to={`/display/${params.id}`}
                            className={(state) => console.log(state)}
                            active={(state) => state.isActive}
                            bgColor="cornflowerblue"
                            color="white"
                            bgColorAlt="var(--clr-accent-green)">
                            Edit
                        </StyledNav.TabLink>
                        <StyledNav.TabLink
                            to={`/display/internal/${params.id}`}
                            className={(state) => console.log(state)}
                            active={(state) => state.isActive}
                            bgColor="cornflowerblue"
                            color="white"
                            bgColorAlt="var(--clr-accent-green)">
                            Modal View
                        </StyledNav.TabLink>
                        <StyledNav.TabLink
                            to={`/display/internal/${params.id}/inset`}
                            className={(state) => console.log(state)}
                            active={(state) => state.isActive}
                            bgColor="cornflowerblue"
                            color="white"
                            bgColorAlt="var(--clr-accent-green)">
                            In Place View
                        </StyledNav.TabLink>
                    </ButtonGroup>
                    <Outlet />
                </StyledContent>
            </StyledMain>
        </Layout.StyledOuterMain>
    );
}

export default LinkDisplay;
