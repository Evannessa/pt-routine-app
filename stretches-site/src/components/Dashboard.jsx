import { Route, Routes, Outlet, useNavigate, Switch } from "react-router-dom";
import Input from "./input/Input";
import React, { useState, useEffect } from "react";
import { Container } from "./styled-components/layout.styled";
import MediaEmbedHandler from "./MediaEmbedHandler";
import styled from "styled-components";
import { ButtonWithIcon } from "./styled-components/Buttons.Styled";
import { requests } from "../helpers/requests";
import TimerSets from "./TimerSets";
import ActionModal from "./ActionModal";
import TimerFactory from "./TimerFactory";
import ActiveTimerDisplay from "./ActiveTimerDisplay";
import TimerGallery from "./TimerGallery";
import { useGlobalContext } from "../context";
import TimerSetCard from "./TimerSetCard";
import { mockTimerSets } from "../mockData/MockTimers";
import { nanoid } from "nanoid";

const DashboardHeader = styled(Container)`
    padding: 1rem;

`
const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    background-color: white;
    justify-content: center;
    gap: 1rem;
    button {
        span.material-icons {
            margin: unset;
        }
    }
`;

const DashboardGrid = styled.section`
    padding: 1rem;
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
    const [showEmbed, setShowEmbed] = useState(false)
    const [embedValues, setEmbedValues] = useState(
        {
            spotify: "",
            youtubeEmbed: ""
        }
    )
    // const [showModal, setShowModal] = React.useState({
    //     isOpen: false,
    //     currentModalIndex: -1,
    // }); //

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
    function setEmbeds(name, value, parentName){
        setEmbedValues((prevValue)=> {
            return {
                ...prevValue,
                [name]: value
            }
        })


    }
    function saveDefaultEmbeds(string){

    }
    

    function setDefaultMediaUrl(index){
        setShowEmbed((prevValue)=> !prevValue)
        // setShowModal({ isOpen: true, currentModalIndex: index });
    }

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
            var id = typeof timerSet._id === "string" ? timerSet._id : nanoid()
            return <TimerSetCard timerSet={timerSet} key={id} timerSetStyle="card"></TimerSetCard>;
        })
        : [];
    return (
        <div>

            <DashboardHeader>
                <h1>At-Home Exercise App</h1>
                <ButtonWrapper>
                    <ButtonWithIcon type="contained" icon="play_circle" title="set default YouTube playlist or video" onClick={setDefaultMediaUrl}>
                        Set YouTube Playlist
                    </ButtonWithIcon>
                    <ButtonWithIcon type="contained" icon="music_note" title="set default Spotify playlist">
                        Set Spotify Playlist
                    </ButtonWithIcon>
                    <ButtonWithIcon type="contained" icon="image" title="set imgur gallery">
                        Set Imgur Gallery
                    </ButtonWithIcon>
                    {(!user || user.role !== "admin") && (
                        <ButtonWithIcon type="contained" icon="save" onClick={onSave} title="Save Timer Sets to local storage">
                            Save Timer Sets Local Storage
                        </ButtonWithIcon>
                    )}
                </ButtonWrapper>
                {showEmbed && <div>
                    <Input type="text" name="youtubeEmbed" inputStyle="floatingLabel" label="Youtube Embed" hasLabel={true} setStateFunction={setEmbeds}></Input>
                    <ButtonWithIcon type="contained" icon="save" onClick={saveDefaultEmbeds} title="Save Timer Sets to local storage">
                    </ButtonWithIcon>
                </div>}
            </DashboardHeader>
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
