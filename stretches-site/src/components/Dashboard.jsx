import { Route, Routes, Outlet, useNavigate, Switch, useParams, useLocation } from "react-router-dom";
import InputButtonGroup from "./input/InputButtonGroup";
import Input, { StyledInputWrapper } from "./input/Input";
import React, { useState, useEffect, useContext } from "react";
import { Container } from "./styled-components/layout.styled";
import MediaEmbedHandler from "./MediaEmbedHandler";
import styled, {css} from "styled-components";
import { ButtonWithIcon } from "./styled-components/Buttons.Styled";
import { requests } from "../helpers/requests";
import TimerSets from "./TimerSets";
import ActionModal from "./ActionModal";
import TimerFactory from "./TimerFactory";
import ActiveTimerDisplay from "./ActiveTimerDisplay";
import TimerGallery from "./TimerGallery";
import { useGlobalContext } from "../context";
import TimerSetCard from "./TimerSetCard";
import { mockTimerSets, mockEmbedUrls } from "../mockData/MockTimers";
import { nanoid } from "nanoid";
import { ThemeContext } from "../App";
import { ThemeProvider } from "styled-components";
import { device } from "./styled-components/devices";

const DashboardHeader = styled(Container)`
    padding: 1rem;
    ${StyledInputWrapper}{
        flex: 2;
    }
    input[type="text"]{
        border-color: var(--clr-primary-orange);
        caret-color:  var(--clr-primary-orange);
        &:hover{
            border-color: var(--clr-primary-pink);
            + label{
                color: var(--clr-primary-pink);
            }
        }
        &:focus, &:focus-within{
            outline: 1px solid var(--clr-primary-pink);
            outline-offset: 2px;
        }

    }
    label{
        

    }

`
const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    background-color: transparent;
    justify-content: center;
    gap: 1rem;

    ${props => props.displayMode ? css`
        color: var(--clr-primary-pink);
        button{
            &:hover{
                color: var(--clr-primary-orange);
            }
        span.material-icons {
            margin: unset;
            color: var(--clr-primary-orange);
            /* color: white; */
        }
        } 
    ` : css`
            button {
            color: hsla(0, 0%, 100%, 0.668);
            &:hover{
                color: hsla(0, 0%, 100%, 1);
            }
            span.material-icons {
                margin: unset;
                color: white;
            }
        }
    `}
`;

const DashboardGrid = styled.section`
    padding: 1rem;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    display: ${props => props.displayMode ? "flex" : "grid"};
    ${props => props.displayMode && "flex-direction: column"};
    ${props => props.displayMode && "overflow-y: scroll"};
`;


const DashboardWrapper = styled.section`
    position: ${props => props.displayMode ? 'absolute' : 'auto'};
    ${props => props.displayMode && css`   
        @media ${device.tablet}{
            width: 30vw;
        }
        @media ${device.laptop}{
            width: 25vw; 
        }
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: scroll;
        backdrop-filter: blur(20px);
        max-height: 100vh;
        top: 0;
        left: 0;
        border-right: 1px solid hsla(0, 0%, 100%, 0.506);
        z-index: 900;`
    };
`;


function Dashboard(props) {
    const saved = true;
    const params = useParams();
    const location = useLocation(); //location in url
    const { user } = useGlobalContext();
    const theme = useContext(ThemeContext)
    // const { name, userId, role } = user;

    /* ---------------------- React Hooks, State and Effect --------------------- */
    // #region Hooks, State and Effect
    const navigate = useNavigate();
    const [timerSets, setTimerSets] = useState();
    const [showEmbed, setShowEmbed] = useState(false)
    const [embedUrls, setembedUrls] = useState(
        {
            spotifyEmbed: "",
            youtubeEmbed: ""
        }
    )
    //get timer sets from local storage, or from the mock timer data
    useEffect(() => {
        let storedData = localStorage.getItem("defaultRoutineData");
        // let storedData = localStorage.getItem("timerSets");
        if (storedData && storedData !== "undefined") {
            setTimerSets(JSON.parse(storedData.timerSets));
            setembedUrls(JSON.parse(storedData.embedUrls))
        } else {
            setTimerSets(mockTimerSets);
            setembedUrls(mockEmbedUrls)
        }
    }, []);

    // save our timer sets if we have saved them before
    useEffect(() => {
        //if we have saved our timer sets before, save them again
        let storedData = localStorage.getItem("defaultRoutineData");
        if (storedData && storedData !== "undefined") {
            onSave()
        }
    }, [timerSets, embedUrls]);

    function onSave() {
        let defaultRoutineData = {
                timerSets,
                embedUrls
            }
            localStorage.setItem("defaultRoutineData", JSON.stringify(defaultRoutineData));
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
    useEffect(() => {
        console.log(location.pathname)
    }, [location.pathname]);
    /**
     * get all of the timer sets
     */
    useEffect(getTimerSets, []);
    // #endregion

    /* -------------------------------- functions ------------------------------- */
    // #region Functions
    /**
     * When the value in the input for the embed changes, set our embed values to match
     * @param {String} name - the name representing the property within the state
     * @param {*} value - the value we're setting the property to
     * @param {String} parentName - if the state has nested objects, parent name will help access that
     */
    function setEmbeds(name, value, parentName){
        console.log({name, value})
        setembedUrls({
                ...embedUrls,
                [name]: value
        })
    }
    /**
     * 
     * @param {String} key - save the url for this particular embed
     */
    function saveDefaultEmbeds(key){
        localStorage.setItem("embedUrls", JSON.stringify(embedUrls));

    }
    

    /**
     * Toggle the popover (or under) for a default link to a YouTube or Spotify embed
     * @param {*} index 
     */
    function setShowMediaEmbedPopover(index){
        setShowEmbed((prevValue)=> !prevValue)
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

    const timerSetCards = timerSets
        ? timerSets.map((timerSet) => {
            let id = nanoid()
            if(typeof timerSet._id === "string"){
                id = timerSet._id
            }else if(typeof timerSet._id === "object"){
                id = timerSet._id.hasOwnProperty("$oid") ? timerSet._id["$oid"] : nanoid()
            }
            if(!timerSet._id || typeof timerSet._id == "object"){
                console.log(timerSet._id)
                timerSet._id = id;
            }
            let isMockData = user && user.role === "admin" ? false : true
            return <TimerSetCard timerSet={timerSet} key={id} timerSetStyle="card" isMockData={isMockData}></TimerSetCard>;
        })
        : [];
    return (
        <div>

            <DashboardWrapper
                displayMode={location.pathname.includes("display")? true : false}
            >
                <ThemeProvider theme={theme}>
                    <DashboardHeader >
                        <h1>At-Home Exercise App</h1>
                        <ButtonWrapper  displayMode={location.pathname.includes("display")}>
                            <ButtonWithIcon type="contained" icon="play_circle" title="set default YouTube playlist or video" onClick={setShowMediaEmbedPopover}>
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
                        {showEmbed && <InputButtonGroup>
                            <Input type="text" name="youtubeEmbed" inputStyle="floatingLabel" label="Youtube Embed" hasLabel={true} setStateFunction={setEmbeds} style={{borderColor: theme.color1}}></Input>
                            <ButtonWithIcon type="contained" icon="save" onClick={(event)=> saveDefaultEmbeds("youtubeEmbed")} title="Save Timer Sets to local storage">
                            </ButtonWithIcon>
                        </InputButtonGroup>}
                    </DashboardHeader>
                </ThemeProvider>
                    <DashboardGrid
                        displayMode={location.pathname.includes("display")? true : false}>
                            {timerSetCards}
                    </DashboardGrid>
            </DashboardWrapper>
            <Outlet context={[timerSets, getTimerSets, saved, embedUrls]} />
        </div>
    );
}

export default Dashboard;
