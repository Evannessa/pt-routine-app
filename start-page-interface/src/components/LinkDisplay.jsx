import React, { useEffect, useState } from "react";
import { requests } from "../helpers/requests";
import styled from "styled-components";
import Avatar from "boring-avatars";
import Input from "./input/Input";
import Form from "./input/Form";
import {
    ButtonGroup,
    IconButton,
    CircleIconButton,
} from "./styled-components/Buttons.Styled";
import {
    StyledCard,
    StyledCardHeader,
    StyledCardBody,
    StyledCardFooter,
    StyledCardSidebar,
    StyledCardWrapper,
    CardComponent,
} from "./styled-components/cards.styled";
import { StyledRouterLink } from "./styled-components/nav.styled";
import TagChips from "./TagChips";
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
const StyledLink = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    color: white;
    background: #25203f;
    border-radius: 5px;
`;
// #endregion

function LinkDisplay(props) {
    const history = useNavigate();
    const params = useParams();
    let id = Object.keys(params).length > 0 ? params.id : "new";
    const location = useLocation();
    const background = location.state && location.state.background;
    const urlBase = "http://localhost:9000/links/display";
    const [links, setLinks] = useState();
    const [filteredLinks, setFilteredLinks] = useState();
    const [formData, setFormData] = React.useState({ jsonData: "", search: "" });
    const [allTags, setAllTags] = React.useState([]);
    const [queryTags, setQueryTags] = React.useState([]);

    useEffect(() => {
        requests.getAll(urlBase, setLinks, "links");
        requests.getAll(`${urlBase}/tags`, setAllTags, "tags");
    }, []);

    useEffect(() => {
        if (!links) {
            return;
        }
        let filtered = links.filter((link) => {
            return link.tags.some((tag) => {
                return tag.name.includes(formData.search);
            });
        });
        console.log("Filtered", filtered);
        setFilteredLinks(filtered);
    }, [links, formData.search]);

    useEffect(() => {
        //filter tags, then set query tags to equal the filtered tags
        // tags are an array, and you need the tag names
        //we want to find the text in the search that matches tag names
        //
        let searchArray = formData.search.split(" "); //split by space characters
        setQueryTags(searchArray);
    }, [formData.search]);

    function downloadJSON() {
        console.log(JSON.stringify(links));
    }
    function uploadJSON() {
        console.log(`uploading JSON`);
        requests.createMultiple(urlBase, formData.jsonData, "object");
    }

    function updateFormData(name, value) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    }

    function deleteLink(id) {
        requests.deleteObject(id, urlBase, setLinks, links, "link");
    }

    const linkComponents = filteredLinks
        ? filteredLinks.map((link) => (
              <StyledCard
                  key={link._id}
                  highlighted={link._id === params.id ? true : false}
                  hasSidebar={true}>
                  <StyledCardWrapper>
                      <StyledCardHeader>
                          <Avatar
                              size="4rem"
                              variant="marble"
                              colors={[
                                  "#02797E",
                                  "#FFA689",
                                  "#D62B58",
                                  "#BF2063",
                                  "#572F4F",
                              ]}
                          />
                          <h2>{link.name}</h2>
                          <StyledRouterLink
                              color="white"
                              underlineColor="white"
                              to={`/display/${link._id}`}>
                              Edit
                          </StyledRouterLink>
                      </StyledCardHeader>
                      <StyledCardBody>
                          {link._id === params.id && <Outlet />}
                          <a href={link.url}>{link.name}</a>
                      </StyledCardBody>
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
                  </StyledCardWrapper>
                  <StyledCardSidebar>
                      <IconButton
                          className="material-icons"
                          onClick={(e) => deleteLink(link._id)}>
                          delete
                      </IconButton>
                  </StyledCardSidebar>
              </StyledCard>
          ))
        : [];

    return (
        <main>
            <StyledRouterLink to="/create/new">Create New</StyledRouterLink>

            <Form
                submitFunction={(e) => {
                    e.preventDefault();
                }}
                submitText="Search">
                <Input
                    type="text"
                    setStateFunction={updateFormData}
                    name="search"
                    value={formData.search}
                    hasLabel={true}></Input>
            </Form>
            <Form action="" submitFunction={uploadJSON} submitText="Upload JSON">
                <Input
                    type="textarea"
                    setStateFunction={updateFormData}
                    name="jsonData"
                    value={formData.jsonData}
                    hasLabel={true}></Input>
            </Form>
            <StyledLinkContainer>{linkComponents}</StyledLinkContainer>
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
            </ButtonGroup>
        </main>
    );
}

export default LinkDisplay;
