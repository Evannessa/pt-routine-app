import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "./styled-components/layout.styled";
import styled from "styled-components";
import { urls, combineUrlFragments } from "../helpers/requests";
import ActionModal from "./ActionModal";
import { ButtonWithIcon } from "./styled-components/Buttons.Styled";

import TimerSetCard from "./TimerSetCard";

const DashboardGrid = styled.section`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

function Dashboard(props) {
    const { timerSets } = props;
    const timerSetCards = timerSets
        ? timerSets.map((timerSet) => {
              return <TimerSetCard timerSet={timerSet} key={timerSet._id} timerSetStyle="card"></TimerSetCard>;
          })
        : [];
    return (
        <div>
            <ButtonWithIcon type="contained" icon="play_circle" title="set default YouTube playlist or video">
                Set YouTube Playlist
            </ButtonWithIcon>
            <ButtonWithIcon type="contained" icon="music_note" title="set default Spotify playlist or video">
                Set Spotify Playlist
            </ButtonWithIcon>
            <ButtonWithIcon type="contained" icon="image">
                Set Imgur Gallery
            </ButtonWithIcon>
            <h1>At-Home Exercise App</h1>
            <Container>
                <DashboardGrid>{timerSetCards}</DashboardGrid>
            </Container>
        </div>
    );
}

export default Dashboard;
