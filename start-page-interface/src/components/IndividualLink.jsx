import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TagChips from "./TagChips";
import LinkNameInput from "./LinkNameInput";
import {
    StyledButton,
    IconButton,
    ButtonGroup,
    OutlinedButton,
    ContainedButton,
} from "./styled-components/Buttons.Styled";
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
    flex-direction: column;
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
        <StyledIndividualLink>
            <IconButton
                className="material-icons"
                btnStyle=""
                color="#212121"
                colorAlt="red"
                onClick={closeModal}>
                close
            </IconButton>
            "Testing": {link && link.name}
            <ButtonGroup>
                <ContainedButton
                    color="black"
                    btnStyle="contained"
                    bgColor="cyan"
                    bgColorAlt="slateblue">
                    Test1
                </ContainedButton>
                <OutlinedButton btnStyle="outlined" color="cyan" bgColorAlt="cyan">
                    Test2
                </OutlinedButton>
            </ButtonGroup>
        </StyledIndividualLink>
    );
}

export default IndividualLink;
