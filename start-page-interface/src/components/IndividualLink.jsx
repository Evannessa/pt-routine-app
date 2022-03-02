import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TagChips from "./TagChips";
import {
    useParams,
    useLocation,
    Link,
    Outlet,
    Navigate,
    useNavigate,
} from "react-router-dom";
import axios from "axios";

const Individual = styled.div`
    background-color: "white";
    width: fit-content;
    height: auto;
`;

function IndividualLink(props) {
    const navigate = useNavigate();
    const closeModal = (event) => {
        event.stopPropagation();
        navigate(-1);
    };
    return <div onClick={closeModal}>"Testing": {props.name}</div>;
}

export default IndividualLink;
