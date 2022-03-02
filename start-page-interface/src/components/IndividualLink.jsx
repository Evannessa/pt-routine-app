import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TagChips from "./TagChips";
import { StyledButton, IconButton } from "./styled-components/Buttons.Styled";
import {
    useParams,
    useLocation,
    Link,
    Outlet,
    Navigate,
    useNavigate,
} from "react-router-dom";
import axios from "axios";

const StyledIndividualLink = styled.div`
    background: white;
    /* width: fit-content; */
    /* height: auto; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 50%;
    z-index: 100;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

function IndividualLink(props) {
    const navigate = useNavigate();
    const [link, setLink] = useState();
    const params = useParams();
    console.log(params);
    const urlBase = "http://localhost:9000/links/display";
    const closeModal = (event) => {
        event.stopPropagation();
        navigate(-1);
    };
    useEffect(() => {
        axios.get(`${urlBase}/${params.id}`).then((response) => {
            setLink(response.data.link);
        });
    }, []);

    return (
        <StyledIndividualLink onClick={closeModal}>
            <IconButton
                className="material-icons"
                btnStyle=""
                color="#212121"
                colorAlt="red">
                close
            </IconButton>
            "Testing": {link && link.name}
        </StyledIndividualLink>
    );
}

export default IndividualLink;
