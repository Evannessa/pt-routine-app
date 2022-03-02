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
} from "react-router-dom";
import axios from "axios";

const StyledLinkContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;
const StyledLink = styled.div`
    display: flex;
    padding: 2rem;
    color: white;
    border: 2px solid white;
    border-radius: 5px;
`;

function LinkDisplay(props) {
    const history = useNavigate();
    const params = useParams();
    let id = Object.keys(params).length > 0 ? params.id : "new";
    const location = useLocation();
    const background = location.state && location.state.background;
    const urlBase = "http://localhost:9000/links";
    const [saved, setSaved] = React.useState(false);
    const [allTags, setAllTags] = React.useState([]);
    const [links, setLinks] = useState();

    useEffect(() => {
        axios.get(`${urlBase}/`).then((response) => setLinks(response.data.sets));
    }, []);

    const linkComponents = links
        ? links.map((link) => (
              <StyledLink key={link._id}>
                  <Link
                      to={{
                          pathname: `/links/${link._id}`,
                          state: { background: location },
                      }}>
                      test
                  </Link>
                  <a href={link.url}>{link.name}</a>
              </StyledLink>
          ))
        : [];
    return (
        <StyledLinkContainer>
            {linkComponents}
            {background && <Route path="/links/:id" children={<IndividualLink />} />}
        </StyledLinkContainer>
    );
}

export default LinkDisplay;
