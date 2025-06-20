import { Route, Routes, Outlet, useNavigate, Switch, useParams, useLocation } from "react-router-dom";
import { IndexedDBHelper, DBStoreData } from "../modules/indexed-db"
import { IDBPDatabase, openDB } from 'idb';
import UploadModal from "./UploadModal";
import InputButtonGroup, { StyledInputButtonGroup } from "./input/InputButtonGroup";
import Input, { StyledInputWrapper } from "./input/Input";
import React, { useState, useEffect, useContext } from "react";
import { Container } from "./styled-components/layout.styled";
import MediaEmbedHandler from "./MediaEmbedHandler";
import styled, { css } from "styled-components";
import { ButtonWithIcon, IconButton, Icon } from "./styled-components/Buttons.Styled";
import { requests } from "../helpers/requests";
import { useGlobalContext } from "../context";
import TimerSetCard from "./TimerSetCard";
import { mockTimerSets, mockEmbedUrls } from "../mockData/MockTimers";
import { nanoid } from "nanoid";
import { ThemeContext } from "../App";
import { ThemeProvider } from "styled-components";
import { device } from "./styled-components/devices";
// import SidebarToggle from "./SidebarToggle";
import Drawer from "./Drawer";
import Modal from "./Modal";
import ActionFactory from "../classes/ActionFactory";
import TimerHelpers from "../classes/TimerHelper";
import RoutinePreview from "./RoutinePreview";
import sunsetLandscape from "../images/sunset_landscape.jpg"
import nightLandscape from "../images/night_landscape.jpg"
import hourglassPrimary from "../images/hourglass_fill_0.png"
import hourglassSecondary from "../images/hourglass_fill_3.png"

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
`
const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    background-color: transparent;
    justify-content: center;
    gap: 1rem;

    ${props => props.displayMode ? css`
        /* color: var(--clr-primary-pink); */
        color: white;
        opacity: 60%;
        button{
            &:hover{
                opacity: 100%;
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
    @media ${device.tablet}{
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    @media ${device.laptop}{
        max-width: 80%;
        margin: 0 auto;
    }
`;

const DashboardOuter = styled.section`
    height: 100vh;
   
`

const DashboardWrapper = styled.section`
    position: ${props => props.displayMode ? 'absolute' : 'auto'};
    ${props => props.displayMode && css`   
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: scroll;
        max-height: 100vh;
        `
    };
    height: 100%;
    background-image: linear-gradient(to top, transparent, ${props => props.theme.theme.color1}), 
        ${props => `url(${props.theme.themeName == "primary" ? sunsetLandscape : nightLandscape})`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const AddRoutineButton = styled.button`

    background-color: transparent;
    padding: 0.5em 1em;
    /* background-color: hsla(0, 0%, 100%, 0.3); */
    border: 2px solid white;
    border-radius: 10px;
    overflow: hidden;
    display: inline-flex;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    color: ${(props) => props.themeColor1 || "white"};
    width: 100%;
    max-height: 100%;
    max-width: 100%;
    justify-content: center;
    font-size: large;
    gap: 0.25em;
`

function Dashboard(props) {
    const saved = true;
    const params = useParams();
    const location = useLocation(); //location in url
    const user = { role: "admin" }
    const db = new IndexedDBHelper('routine-app', 1.1)
    // const { user } = useGlobalContext();
    const theme = useContext(ThemeContext)
    const inDisplayMode = location.pathname.includes("display") || location.pathname.includes("factory")
    // const { name, userId, role } = user;

    /* ---------------------- React Hooks, State and Effect --------------------- */
    // #region Hooks, State and Effect
    const navigate = useNavigate();
    const [timerSets, setTimerSets] = useState();
    const [hoveredSet, setHoveredSet] = useState()
    const [showEmbed, setShowEmbed] = useState(false)
    const [showGalleryModal, setShowGalleryModal] = React.useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState({
        set: '',
        showPrompt: false
    })

    // "cards" vs "list"
    // const [viewMode, setViewMode] = useState("cards")
    const [embedUrls, setEmbedUrls] = useState(
        {
            spotifyEmbed: "",
            youtubeEmbed: ""
        }
    )

    //get timer sets from local storage, or from the mock timer data
    useEffect(() => {
        getFromIndexedDB()
        // getFromLocalStorage()
        // let storedData = localStorage.getItem("defaultRoutineData");
        // if (storedData && storedData !== "undefined") {
        //     setTimerSets(JSON.parse(storedData.timerSets));
        //     setEmbedUrls(JSON.parse(storedData.embedUrls))
        // } else {
        //     setTimerSets(mockTimerSets);
        //     setEmbedUrls(mockEmbedUrls)
        // }
    }, []);

    // save our timer sets if we have saved them before
    useEffect(() => {
        //if we have saved our timer sets before, save them again
        // saveToLocalStorage()
        // let storedData = localStorage.getItem("defaultRoutineData");
        // if (storedData && storedData !== "undefined") {
        //     onSave()
        // }
    }, [timerSets, embedUrls]);

    // get default routine data from local storage
    function getFromLocalStorage() {
        let storedData = localStorage.getItem("defaultRoutineData");
        if (storedData && storedData !== "undefined") {
            setTimerSets(JSON.parse(storedData.timerSets));
            setEmbedUrls(JSON.parse(storedData.embedUrls))
        } else {
            setTimerSets(mockTimerSets);
            setEmbedUrls(mockEmbedUrls)
        }
    }

    function createDefaultDataInDB(){
  console.log("Creating new from indexedDB")
        // const db = new IndexedDBHelper('routine-app', 1.1)
        const storeData = new DBStoreData(
            'routines', 
            [
                {indexName: "label", options: {unique: false}}, 
                { indexName: 'timers', options:{unique: false, multiEntry: true}},
                {indexName: "youtubeLink", options: {unique: false}}, 
                {indexName: "spotifyLink", options: {unique: false}}, 
                {indexName: "repeatNumber", options: {unique: false}},

            ],
            {
                keyPath: "id"
            }
        )
        db.createStoreInDB(storeData)
        db.addItemsToStore(storeData, [
            {
                "id": "seated-exercises",
                "label": "PT Timer - Seated",
                "timers": [
                    {
                        "time": {
                            "seconds": 30,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Prone I",
                        "slideImagePath": "/uploads/PT/prone-i.jpg",
                        "description": "Prone Retraction Extension",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 2,
                        "_id": "prone-i"
                    },
                    {
                        "time": {
                            "seconds": 30,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Prone Superman",
                        "slideImagePath": "/uploads/PT/prone_i_superman.jpg",
                        "description": "Prone Superman",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 2,
                        "_id": "prone-superman"
                    },
                    {
                        "time": {
                            "seconds": 30,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Prone T",
                        "slideImagePath": "/uploads/PT/prone-t-raises.jpg",
                        "description": "Prone T Raises - Thumbs Up",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 2,
                        "_id": "prone-t"
                    },
                    {
                        "time": {
                            "seconds": 30,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Prone Y",
                        "slideImagePath": "/uploads/PT/prone-y.jpg",
                        "description": "Prone Y",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 2,
                        "_id": "prone-y"
                    },
                    {
                        "time": {
                            "seconds": 5,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Snow Angels",
                        "slideImagePath": "/uploads/PT/snow-angels.jpg",
                        "description": "Snow Angels",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 20,
                        "_id": "snow-angels"
                    },
                    {
                        "time": {
                            "seconds": 0,
                            "minutes": 1,
                            "hours": 0
                        },
                        "label": "Cat Cow",
                        "slideImagePath": "/uploads/PT/cat_cow_2.jpg",
                        "description": "Cat Cow",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 2,
                        "_id": "cat-cow"
                    }
                ],
                "youtubeLink": "",
                "spotifyLink": "",
                "repeatNumber": 1,
            },
            {
                "id": "wall-exercises",
                "label": "PT Timer - Wall",
                "timers": [
                    {
                        "time": {
                            "seconds": 5,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Wall Pushups",
                        "slideImagePath": "/uploads/PT/wall-pushups.jpg",
                        "description": "Wall pushups",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 20,
                        "_id": "wall-push"
                    },
                    {
                        "time": {
                            "seconds": 30,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Wall Chest Stretch",
                        "slideImagePath": "/uploads/PT/wall-chest-stretch.jpg",
                        "description": "Wall Chest Stretch",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 2,
                        "_id": "wall-chest-stretch"
                    },
                    {
                        "time": {
                            "seconds": 1,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Resistance Band Rows",
                        "slideImagePath": "/uploads/PT/resistance-band-rows.jpg",
                        "description": "Resistance Band Rows",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 25,
                        "_id": "resistance-band-rows"
                    },
                ],
                "youtubeLink": "",
                "spotifyLink": "",
                "repeatNumber": 1,
            },
            {
                "id": "floor-exercises",
                "label": "PT Timer - Floor",
                "timers": [
                    {
                        "time": {
                            "seconds": 30,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Prone I",
                        "slideImagePath": "/uploads/PT/prone-i.jpg",
                        "description": "Prone Retraction Extension",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 2,
                        "_id": "prone-i"
                    },
                    {
                        "time": {
                            "seconds": 30,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Prone Superman",
                        "slideImagePath": "/uploads/PT/prone_i_superman.jpg",
                        "description": "Prone Superman",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 2,
                        "_id": "prone-superman"
                    },
                    {
                        "time": {
                            "seconds": 30,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Prone T",
                        "slideImagePath": "/uploads/PT/prone-t-raises.jpg",
                        "description": "Prone T Raises - Thumbs Up",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 2,
                        "_id": "prone-t"
                    },
                    {
                        "time": {
                            "seconds": 30,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Firelog Pose",
                        "slideImagePath": "/uploads/PT/firelog-pose.jpg",
                        "description": "Firelog Pose",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 2,
                        "_id": "prone-y"
                    },
                    {
                        "time": {
                            "seconds": 5,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Snow Angels",
                        "slideImagePath": "/uploads/PT/snow-angels.jpg",
                        "description": "Snow Angels",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 20,
                        "_id": "snow-angels"
                    },
                    {
                        "time": {
                            "seconds": 2,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Laying Internal Shoulder Rotation",
                        "slideImagePath": "/uploads/PT/internal-shoulder-rotation.jpg",
                        "description": "Laying Internal Shouldr Rotation",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 20,
                        "_id": "internal-shoulder-rot"
                    },
                    {
                        "time": {
                            "seconds": 2,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Laying External Shoulder Rotation",
                        "slideImagePath": "/uploads/PT/external-shoulder-rotation.jpg",
                        "description": "Laying External Shoulder Rotation",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 20,
                        "_id": "external-shoulder-rot"
                    },
                    {
                        "time": {
                            "hours": 0,
                            "seconds": 0,
                            "minutes": 1
                        },
                        "label": "Thread the Needle",
                        "slideImagePath": "/uploads/PT/thread-the-needle.jpg",
                        "description": "thread the needle",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 0,
                        _id: "thread-needle"
                    },
                    {
                        "time": {
                            "seconds": 10,
                            "minutes": 0,
                            "hours": 0
                        },
                        "label": "Cat Cow",
                        "slideImagePath": "/uploads/PT/cat_cow_2.jpg",
                        "description": "Cat Cow",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 4,
                        "_id": "cat-cow"
                    },
                    {
                        "time": {
                            "seconds": 0,
                            "minutes": 1,
                            "hours": 0
                        },
                        "label": "Cat Cow",
                        "slideImagePath": "/uploads/PT/cat_cow_2.jpg",
                        "description": "Cat Cow",
                        "autostart": true,
                        "isBreak": false,
                        "isAutoBreak": false,
                        "repeatNumber": 2,
                        "_id": "cat-cow"
                    }
                ],
                "youtubeLink": "",
                "spotifyLink": "",
                "repeatNumber": 1,
            }


        ])
    }
    // get default routine data from indexedDB
    async function getFromIndexedDB() {
        // const dbName = "routine-app"
        const isExisting = (await window.indexedDB.databases()).map(db => db.name).includes(db.dbName);
        if(!isExisting){
            createDefaultDataInDB()
        }
        db.getItemFromStore("routines", 'seated-exercises')
      
    }


    // save default routine data from indexedDB
    function saveToIndexedDB() {

    }

    // save default routine data to local storage
    function saveToLocalStorage() {
        let storedData = localStorage.getItem("defaultRoutineData");
        if (storedData && storedData !== "undefined") {
            onSave()
        }

    }

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
                pathsArray: ["factory"],
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
    /**
     * When the value in the input for the embed changes, set our embed values to match
     * @param {String} name - the name representing the property within the state
     * @param {*} value - the value we're setting the property to
     * @param {String} parentName - if the state has nested objects, parent name will help access that
     */
    function setEmbeds(name, value, parentName) {
        console.log({ name, value })
        setEmbedUrls({
            ...embedUrls,
            [name]: value
        })
    }
    /**
     * 
     * @param {String} key - save the url for this particular embed
     */
    function saveDefaultEmbeds(key) {
        localStorage.setItem("embedUrls", JSON.stringify(embedUrls));

    }


    /**
     * Toggle the popover (or under) for a default link to a YouTube or Spotify embed
     * @param {*} index 
     */
    function setShowMediaEmbedPopover(index) {
        setShowEmbed((prevValue) => !prevValue)
    }

    function navigateToFactory(newId) {
        navigate(`/dashboard/factory/${newId}`);
    }
    function navigateToDashboard() {
        navigate(`/dashboard/`);
    }

    function cancelShowDeletePrompt() {
        setShowDeletePrompt(prevValue => {
            return {
                ...prevValue,
                showPrompt: false,
                set: ''
            }
        })
    }
    function toggleShowDeletePrompt(id) {
        setShowDeletePrompt(prevValue => {
            return {
                ...prevValue,
                showPrompt: true,
                set: id
            }
        })
    }

    function deleteSet(id) {
        console.log("Test. Will delete", id)
        let options = {
            method: "DELETE",
            pathsArray: ["factory", id],
            setStateCallback: getTimerSets,
        };
        requests.axiosRequest(options);
        cancelShowDeletePrompt()
    }
    const updateSets = async function (action, id) {
        // console.log("Doing " + action + " to " + id);
        switch (action) {
            case "create":
                await createNewSet();
                // navigate(`/factory/${newId}`);
                break;
            case "delete":
                toggleShowDeletePrompt(id)
                break;
            case "edit":
                navigate(`/dashboard/factory/${id}`);
                break;
            default:
                console.warn("Not a valid action");
                break;
        }
    };

    function childHovered(id) {
        // let hoveredSet = timerSets[id]
        if (id) {
            setHoveredSet(timerSets[id])
        } else {
            setHoveredSet(null)
        }


    }

    function showImageGallery() {

    }


    const timerSetCards = timerSets
        ? timerSets.map((timerSet) => {
            let id = TimerHelpers.getSetId(timerSet)
            // if(typeof timerSet._id === "string"){
            //     id = timerSet._id
            // }else if(typeof timerSet._id === "object"){
            //     id = timerSet._id.hasOwnProperty("$oid") ? timerSet._id["$oid"] : nanoid()
            // }
            if (!timerSet._id || typeof timerSet._id == "object") {
                timerSet._id = id;
            }
            let isMockData = user && user.role === "admin" ? false : true
            return <TimerSetCard timerSet={timerSet} key={id} timerSetStyle="card" isMockData={isMockData} updateSets={updateSets}
                isActive={params.setId === id}
            // childHovered={(val)=> val ? childHovered(id) : childHovered(null)}
            ></TimerSetCard>;
        })
        : [];


    const ConditionalWrapper = ({ condition, wrapper, children }) =>
        condition ? wrapper(children) : children;

    const focusedRoutine = timerSets && Array.isArray(timerSets) ? timerSets.find((set) => TimerHelpers.getSetId(set) == showDeletePrompt.set) : 'Not an array'

    return (
        <ThemeProvider theme={theme}>
            <DashboardOuter className="dashboard__outer">
                {showDeletePrompt.showPrompt &&
                    <Modal
                        setId={showDeletePrompt.set}
                        title="Warning!"
                        icon="warning"
                        description={`Are you sure you want to delete routine 
                        '${focusedRoutine?.label}'?
                        This action is irreversible!     
                    `}
                        actions={
                            [
                                ActionFactory("Delete Routine", "delete_forever", deleteSet, "Delete Routine", { classList: "primary" })
                            ]
                        }
                        cancelAction={cancelShowDeletePrompt}
                    >
                    </Modal>
                }
                {showGalleryModal && (
                    <UploadModal
                        isGlobal={true}
                        closeCallback={() =>
                            setShowGalleryModal(false)
                        }
                    ></UploadModal>
                )}
                <ConditionalWrapper condition={inDisplayMode} wrapper={children => <Drawer>{children}</Drawer>}>
                    <DashboardWrapper
                        displayMode={inDisplayMode}
                    >
                        <DashboardHeader >
                            {/* <h1>At-Home Exercise App</h1> */}
                            <ButtonWrapper displayMode={inDisplayMode}>
                                {/*TODO: Turn these into a set of ActionFactory objects  */}
                                {inDisplayMode && <ButtonWithIcon type="contained" icon="home" title="back to dashboard"
                                    onClick={() => navigateToDashboard()}
                                />}
                                <ButtonWithIcon type="contained" icon="gallery_thumbnail" title="show image gallery" onClick={() => setShowGalleryModal(!showGalleryModal)} />
                                <ButtonWithIcon type="contained" icon="play_circle" title="set default YouTube playlist or video" onClick={setShowMediaEmbedPopover} />
                                {/* <ButtonWithIcon type="contained" icon="music_note" title="set default Spotify playlist" onClick={}> */}
                                {/* </ButtonWithIcon> */}
                                {(!user || user.role !== "admin") && (
                                    <ButtonWithIcon type="contained" icon="save" onClick={onSave} title="Save Timer Sets to local storage">
                                        Save Timer Sets Local Storage
                                    </ButtonWithIcon>
                                )}
                            </ButtonWrapper>
                            {showEmbed && <InputButtonGroup>
                                <Input type="text" name="youtubeEmbed" inputStyle="floatingLabel" label="Youtube Embed" hasLabel={true} setStateFunction={setEmbeds} style={{ borderColor: theme.color1 }}></Input>
                                <ButtonWithIcon type="contained" icon="save" onClick={(event) => saveDefaultEmbeds("youtubeEmbed")} title="Save defaulut YouTube embed">
                                </ButtonWithIcon>
                            </InputButtonGroup>}
                        </DashboardHeader>
                        <DashboardGrid
                            displayMode={inDisplayMode}
                            theme={theme}
                        >
                            {timerSetCards}
                            <AddRoutineButton
                                title="add New Routine"
                                onClick={createNewSet}
                            >
                                <Icon icon="add"></Icon>
                                <span>Add Routine</span>
                            </AddRoutineButton>
                        </DashboardGrid>
                        {/* {location.pathname.includes("display") && <SidebarToggle></SidebarToggle>} */}
                    </DashboardWrapper>
                </ConditionalWrapper>
                {/* <RoutinePreview routine={hoveredSet}></RoutinePreview> */}
                <Outlet context={[timerSets, getTimerSets, saved, embedUrls, user]} />

            </DashboardOuter>
        </ThemeProvider>
    );
}

export default Dashboard;
