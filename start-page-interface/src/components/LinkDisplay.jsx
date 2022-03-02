import React, { useEffect, useState } from "react";
import IndividualLink from "./IndividualLink";
import styled from "styled-components";
import {
    ButtonGroup,
    IconButton,
    CircleIconButton,
} from "./styled-components/Buttons.Styled";
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
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
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

    useEffect(() => {
        axios.get(`${urlBase}/`).then((response) => setLinks(response.data.sets));
    }, []);

    function downloadJSON() {
        console.log(JSON.stringify(links));
    }
    function uploadJSON() {}

    function deleteLink(id) {
        try {
            axios.delete(`${urlBase}/${id}`).then((response) => {
                setLinks(links.filter((link) => link._id !== response.data.link._id));
            });
        } catch (error) {
            console.log(error);
        }
    }

    const linkComponents = links
        ? links.map((link) => (
              <StyledLink key={link._id}>
                  <h2>{link.name}</h2>
                  <Link to={`/display/${link._id}`}>Edit</Link>
                  {link._id === params.id && <Outlet />}
                  <a href={link.url}>{link.name}</a>
                  <div>
                      {link.tags.map((tag) => {
                          return (
                              <TagChips
                                  key={tag._id}
                                  tag={tag}
                                  tagName={tag.name}></TagChips>
                          );
                      })}
                  </div>
                  <IconButton
                      className="material-icons"
                      onClick={(e) => deleteLink(link._id)}>
                      delete
                  </IconButton>
              </StyledLink>
          ))
        : [];
    return (
        <StyledLinkContainer>
            {linkComponents}
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
                <CircleIconButton
                    className="material-icons"
                    btnStyle="contained"
                    color="white"
                    bgColorAlt="white"
                    bgColor="cornflowerblue"
                    colorAlt="cornflowerblue"
                    // onClick={}
                >
                    file_upload
                </CircleIconButton>
                <Link to="/create/new">Create New</Link>
            </ButtonGroup>
        </StyledLinkContainer>
    );
}

export default LinkDisplay;
