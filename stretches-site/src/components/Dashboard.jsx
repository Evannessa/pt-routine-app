import { Route, Routes, Outlet, useNavigate, Switch, useParams, useLocation } from "react-router-dom";
import UploadModal from "./UploadModal";
import InputButtonGroup from "./input/InputButtonGroup";
import Input, { StyledInputWrapper } from "./input/Input";
import React, { useState, useEffect, useContext } from "react";
import { Container } from "./styled-components/layout.styled";
import MediaEmbedHandler from "./MediaEmbedHandler";
import styled, {css} from "styled-components";
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
    background-image: linear-gradient(to top, transparent, ${props => props.theme.theme.color1}), ${`url(${sunsetLandscape})`};
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
    const user = {role: "admin"}
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
        let storedData = localStorage.getItem("defaultRoutineData");
        // let storedData = localStorage.getItem("timerSets");
        if (storedData && storedData !== "undefined") {
            setTimerSets(JSON.parse(storedData.timerSets));
            setEmbedUrls(JSON.parse(storedData.embedUrls))
        } else {
            setTimerSets(mockTimerSets);
            setEmbedUrls(mockEmbedUrls)
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
    function setEmbeds(name, value, parentName){
        console.log({name, value})
        setEmbedUrls({
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
        navigate(`/dashboard/factory/${newId}`);
    }
    function navigateToDashboard() {
        navigate(`/dashboard/`);
    }

    function cancelShowDeletePrompt(){
        setShowDeletePrompt(prevValue => {
            return{
                ...prevValue,
                showPrompt: false,
                set: ''
            }
        })
    }
    function toggleShowDeletePrompt(id){
        setShowDeletePrompt(prevValue => {
            return{
                ...prevValue,
                showPrompt: true,
                set: id
            }
        })
    }

    function deleteSet(id){
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

    function childHovered(id){
        // let hoveredSet = timerSets[id]
        if(id){
            setHoveredSet(timerSets[id])
        }else{
            setHoveredSet(null)
        }


    }

    function showImageGallery(){

    }
  

    const timerSetCards = timerSets
        ? timerSets.map((timerSet) => {
            let id = TimerHelpers.getSetId(timerSet)
            // if(typeof timerSet._id === "string"){
            //     id = timerSet._id
            // }else if(typeof timerSet._id === "object"){
            //     id = timerSet._id.hasOwnProperty("$oid") ? timerSet._id["$oid"] : nanoid()
            // }
            if(!timerSet._id || typeof timerSet._id == "object"){
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
    
    const focusedRoutine = timerSets && Array.isArray(timerSets) ? timerSets.find((set)=> TimerHelpers.getSetId(set) == showDeletePrompt.set) : 'Not an array'

    return (
        <ThemeProvider theme={theme}>
        <DashboardOuter className="dashboard__outer">
            { showDeletePrompt.showPrompt && 
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
                            ActionFactory("Delete Routine", "delete_forever", deleteSet, "Delete Routine", {classList: "primary"})
                        ]
                    }
                    cancelAction={cancelShowDeletePrompt}
                >
                </Modal>
            }
            {showGalleryModal && (
                        <UploadModal
                            // parentId={props.id}
                            // slideImagePath={props.slideImagePath}
                            // updateTimerData={updateTimerData}
                            closeCallback={() =>
                                setShowGalleryModal(false)
                            }
                        ></UploadModal>
                    )}
            <ConditionalWrapper condition={inDisplayMode} wrapper={children=> <Drawer>{children}</Drawer>}>
                <DashboardWrapper
                    displayMode={inDisplayMode}
                >
                        <DashboardHeader >
                            {/* <h1>At-Home Exercise App</h1> */}
                            <ButtonWrapper  displayMode={inDisplayMode}>
                                {/*TODO: Turn these into a set of ActionFactory objects  */}
                                {inDisplayMode && <ButtonWithIcon type="contained" icon="home" title="back to dashboard"
                                onClick={()=> navigateToDashboard()} 
                                />}
                                <ButtonWithIcon type="contained" icon="gallery_thumbnail" title="show image gallery" onClick={()=> setShowGalleryModal(!showGalleryModal)}/>
                                <ButtonWithIcon type="contained" icon="play_circle" title="set default YouTube playlist or video" onClick={setShowMediaEmbedPopover}/>
                                {/* <ButtonWithIcon type="contained" icon="music_note" title="set default Spotify playlist" onClick={}> */}
                                {/* </ButtonWithIcon> */}
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
