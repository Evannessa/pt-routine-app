import React, { useEffect, useState } from "react";
import IndividualLink from "./IndividualLink";
import styled from "styled-components";
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
    gap: 1rem;
    width: 100%;
`;
const StyledLink = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
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

    const linkComponents = links
        ? links.map((link) => (
              <StyledLink key={link._id}>
                  <h2>{link.name}</h2>
                  {/* <Link to={`/create/${link._id}`} state={{ background: location }}>
                  </Link> */}
                  {link._id === params.id && <Outlet />}
                  <a href={link.url}>{link.name}</a>
              </StyledLink>
          ))
        : [];
    return <StyledLinkContainer>{linkComponents}</StyledLinkContainer>;
}

export default LinkDisplay;
