import { Route, Routes, Outlet, useNavigate, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container } from "./styled-components/layout.styled";
import styled from "styled-components";
import { ButtonWithIcon } from "./styled-components/Buttons.Styled";
import { requests } from "../helpers/requests";
import TimerSets from "./TimerSets";
import TimerFactory from "./TimerFactory";
import ActiveTimerDisplay from "./ActiveTimerDisplay";
import TimerGallery from "./TimerGallery";
import { useGlobalContext } from "../context";
import TimerSetCard from "./TimerSetCard";
import { mockTimerSets } from "../mockData/MockTimers";

const DashboardGrid = styled.section`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

function Dashboard(props) {
    const { user } = useGlobalContext();
    // const { name, userId, role } = user;

    /* ---------------------- React Hooks, State and Effect --------------------- */
    // #region Hooks, State and Effect
    const navigate = useNavigate();
    const [timerSets, setTimerSets] = useState();

    useEffect(() => {
        let storedData = localStorage.getItem("timerSets");
        if (storedData && storedData !== "undefined") {
            setTimerSets(JSON.parse(storedData));
        } else {
            setTimerSets(mockTimerSets);
        }
    }, []);
    useEffect(() => {
        //if we have saved our timer sets before, save them again
        let storedData = localStorage.getItem("timerSets");
        if (storedData && storedData !== "undefined") {
            localStorage.setItem("timerSets", JSON.stringify(timerSets));
        }
    }, [timerSets]);

    function onSave() {
        localStorage.setItem("timerSets", JSON.stringify(timerSets));
    }
    function updateTimerSets(response) {
        if (response != null) {
            setTimerSets(response);
        }
    }
    /**
     * Create a new timer set
     */
    async function createNewSet() {
        if (user && user.role === "admin") {
            let options = {
                method: "POST",
                pathsArray: ["factory", "new"],
                setStateCallback: (info) => {
                    const newId = info._id;
                    navigateToFactory(newId);
                    getTimerSets();
                },
            };
            await requests.axiosRequest(options);
        } else {
            console.log("Not admin");
        }
    }

    function getTimerSets() {
        if (user && user.role === "admin") {
            let options = {
                method: "GET",
                pathsArray: ["factory", "/"],
                setStateCallback: updateTimerSets,
            };
            requests.axiosRequest(options);
        } else {
            console.log("Can't get sets -- not admin");
        }
    }

    /**
     * get all of the timer sets
     */
    useEffect(getTimerSets, []);
    // #endregion

    /* -------------------------------- functions ------------------------------- */
    // #region Functions

    function navigateToFactory(newId) {
        navigate(`/factory/${newId}`);
    }
    const updateSets = async function updateSets(action, id) {
        // console.log("Doing " + action + " to " + id);
        switch (action) {
            case "create":
                await createNewSet();
                // navigate(`/factory/${newId}`);
                break;
            case "delete":
                let options = {
                    method: "DELETE",
                    pathsArray: ["factory", id],
                    setStateCallback: getTimerSets,
                };
                requests.axiosRequest(options);
                break;
            case "edit":
                navigate(`/factory/${id}`);
                break;
            default:
                console.warn("Not a valid action");
        }
    };
    // const { timerSets } = props;
    const timerSetCards = timerSets
        ? timerSets.map((timerSet) => {
              return <TimerSetCard timerSet={timerSet} key={timerSet._id} timerSetStyle="card"></TimerSetCard>;
          })
        : [];
    return (
        <div>
            <h1>At-Home Exercise App</h1>
            <ButtonWithIcon type="contained" icon="play_circle" title="set default YouTube playlist or video">
                Set YouTube Playlist
            </ButtonWithIcon>
            <ButtonWithIcon type="contained" icon="music_note" title="set default Spotify playlist or video">
                Set Spotify Playlist
            </ButtonWithIcon>
            <ButtonWithIcon type="contained" icon="image">
                Set Imgur Gallery
            </ButtonWithIcon>
            {(!user || user.role !== "admin") && (
                <ButtonWithIcon type="contained" icon="save" onClick={onSave}>
                    Save Timer Sets Local Storage
                </ButtonWithIcon>
            )}
            <Container>
                <DashboardGrid>{timerSetCards}</DashboardGrid>
            </Container>
            <Routes>
                {/* <Route path="/" element={<Dashboard timerSets={timerSets} />}></Route> */}
                <Route path="factory" element={<TimerFactory />}>
                    <Route
                        path=":setId"
                        element={<TimerGallery timerSets={timerSets} getTimerSets={getTimerSets} saved={true} />}
                    ></Route>
                </Route>
                <Route path="display/:setId" element={<ActiveTimerDisplay />}></Route>
            </Routes>
        </div>
    );
}

export default Dashboard;
