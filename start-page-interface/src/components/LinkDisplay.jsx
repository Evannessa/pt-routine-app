import React, { useEffect, useState } from "react";
import { requests } from "../helpers/requests";
import styled from "styled-components";
import Avatar from "boring-avatars";
import Input from "./input/Input";
import Form from "./input/Form";
import ChipGroup from "./ChipGroup";
import {
    ButtonGroup,
    IconButton,
    CircleIconButton,
} from "./styled-components/Buttons.Styled";
import * as Layout from "./styled-components/layout.styled";
import {
    StyledContent,
    StyledSidebar,
    StyledMain,
} from "./styled-components/layout.styled";
import {
    StyledCard,
    StyledCardHeader,
    StyledCardBody,
    StyledCardFooter,
    StyledCardSidebar,
    StyledCardSidebarLeft,
    CardComponent,
    StyledCardHorizontal,
} from "./styled-components/cards.styled";
import { StyledRouterLink } from "./styled-components/nav.styled";
import TagChips from "./TagChips";
import { chipGroup, StyledChipSpan } from "./styled-components/chips.styled";
import {
    useParams,
    useLocation,
    Link,
    Outlet,
    Navigate,
    useNavigate,
    Route,
    Routes,
} from "react-router-dom";
import axios from "axios";
import { StyledChipbox } from "./styled-components/input.styled";

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
        searchFilters: { tags: false, titles: true, urls: false },
    });
    const [allTags, setAllTags] = React.useState([]);
    const [queryTags, setQueryTags] = React.useState([]);

    useEffect(() => {
        requests.getAll(urlBase, setLinks, "links");
        requests.getAll(`${urlBase}/tags`, setAllTags, "tags");
    }, []);

    /**
     * When the links or the search data changes, update to see what has been filtered
     */
    useEffect(() => {
        if (!links) {
            return;
        }
        let filtered;
        //no form data, so no filters
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
                          return queryTags.some((el) => tag.name.includes(el));
                      });
                  })
                : [];
            //if the name filter is selected
            let filteredNames = formData.searchFilters.titles
                ? links.filter((link) => {
                      return queryTags.some((el) => link.name.includes(el));
                  })
                : [];

            //if the url filter is selected
            let filteredUrls = formData.searchFilters.urls
                ? links.filter((link) => {
                      return queryTags.some((el) => link.url.includes(el));
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
    }, [links, formData.search, formData.searchFilters]);

    useEffect(() => {
        //filter tags, then set query tags to equal the filtered tags
        // tags are an array, and you need the tag names
        //we want to find the text in the search that matches tag names
        //but also names/urls
        let searchData = formData.search;
        // let quotePattern = /('(((\\)+(')?)|([^']))*')|("(((\\)+(")?)|([^"]))*")/g;
        // let exact = searchData.match(quotePattern);
        // console.log(exact);
        searchRegexPattern();
        let searchArray = searchRegexPattern();
        // let searchArray = formData.search.split(" "); //split by space characters
        // console.log(searchArray);
        setQueryTags(searchArray);
    }, [formData.search]);

    // let filterChips = searchFilters.map();

    function createRegex(word, count) {
        let pattern = /\b(bet)/;
    }
    function searchRegexPattern() {
        let searchData = formData.search.toString();
        //1. extract items in quotes from the string first
        // // let quotePattern = /"(.*?)"/;
        // searchData = searchData.replace(/\\/g, "");
        // let quotePattern = /(?<=(["']))(?:(?=(\\?))\2.)*?(?=\1)/;
        // let exactMatches = searchData.match(quotePattern);
        // console.log("Ext matches", exactMatches);
        // searchData = searchData.replace(quotePattern, "");
        // console.log("Search data", searchData);
        //then split the remaining words based on delimeters space or comma
        let searchKeywords = searchData.split(/[\s,]+/);
        //combine in array and match each with tags and name, using boundaries to match partial or whole
        // for()
        console.log(searchKeywords);
        return searchKeywords;
        // let ^(?=.*\bjack\b)(?=.*\bjames\b)(?=.*\bjason\b)(?=.*\bjules\b).*$
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
                          <StyledRouterLink
                              color="white"
                              to={`/display/${link._id}`}
                              className="material-icons">
                              edit
                          </StyledRouterLink>
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
                <Form>
                    <ChipGroup
                        chips={formData.searchFilters}
                        setStateFunction={updateFormData}
                        parentName="searchFilters"></ChipGroup>
                </Form>
                <StyledRouterLink to="/create/new">
                    {" "}
                    Create New <span className="material-icons">add</span>
                </StyledRouterLink>

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
                <StyledSidebar>
                    <div></div>
                    {linkComponents}
                </StyledSidebar>

                <StyledContent>
                    <Outlet />
                </StyledContent>
            </StyledMain>
        </Layout.StyledOuterMain>
    );
}

export default LinkDisplay;
