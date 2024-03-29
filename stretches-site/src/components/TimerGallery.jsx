import React, { useCallback, useState } from "react";
import throttle from "lodash.throttle";
import PreviewTimer from "./PreviewTimer";
import { placeholderImages, getPlaceholderImage } from "./Images";
import { mockTimerSets } from "../mockData/MockTimers";
import ActionModal from "./ActionModal";
import RoutineTimeline from "./RoutineTimeline";
import { useParams, useLocation, Navigate, useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "../App";
import GalleryHeader from "./GalleryHeader";
import { requests } from "../helpers/requests";
import { useGlobalContext } from "../context";
import AutoBreakConfig from "./AutoBreakConfig";
import helpers from "../classes/Helpers";
import FloatingToolbar from "./FloatingToolbar";
import ActionFactory from "../classes/ActionFactory";
import { useMediaQuery } from 'react-responsive'
import { device } from "./styled-components/devices";

/* ---------------------------- Styled Components --------------------------- */

// #region Styled Components
const TimerWrapper = styled.div`
    --clr-clr1: ${(props) => props.theme.color1};
    --clr-clr2: ${(props) => props.theme.color2};
    --clr-gradient: linear-gradient(45deg, var(--clr-clr1), var(--clr-clr2));
    &::-webkit-scrollbar-thumb {
        background: var(--clr-gradient);
    }
    label{
        color: ${props => props.theme.color2};
    }
`;
const GalleryWrapper = styled.section``;
GalleryWrapper.displayName = "GalleryWrapper";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
const CircleButton = styled.button`
    border-radius: 50% !important;
    width: 3rem !important;
    height: 3rem !important;
`;
CircleButton.displayName = "CircleButton";

// #endregion
/**
 *
 * @param {*} props
 * @returns a component that allows you to swipe or click through timers to edit them individually if needed
 */

export default function TimerGallery(props) {
    /* ------------------------------- React Hooks ------------------------------ */
    // #region States and hooks


    const [timerSets, getTimerSets, embedUrls, user] = useOutletContext();
    // const user = {role: "admin"}
    // let { timerSets, getTimerSets } = props;
    const { theme, updateTheme } = React.useContext(ThemeContext);
    const observer = React.useRef(); //intersection Observer
    const childRefs = React.useRef([]); //the references to all timer objects
    const scrollRef = React.useRef(); //references to the scroll container for the objects
    const [saved, setSaved] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [showModal, setShowModal] = React.useState({
        isOpen: false,
        currentModalIndex: -1,
    }); //whether or not we want to show the modal
    const [formData, setFormData] = React.useState(props.formData || {});
    // const [timerSet, setTimerSet] = React.useState();
    const [currentTimer, setCurrentTimer] = React.useState();
    const [uiToggles, setUiToggles] = useState({
        sortMode: false,
        showAutoBreak: false,
        
    })
    const navigate = useNavigate();

    let params = useParams(); //show the params of the get request
    const location = useLocation(); //location in url
    const storedRef = React.useRef(); //ref for id of current timer set
    const timerInView = React.useRef();
    let id = Object.keys(params).length > 0 ? params.setId : "new";
    const label = React.useRef("New Timer Set");
    const modalInfo = [
        {
            name: "spotifyLink",
            description: <span>Copy & Paste a Spotify url below to embed a Spotify podcast episode or Playlist into this routine.</span>,
            type: "embed",
            onSubmit: linkSpotify,
        },
        {
            name: "youtubeLink",
            title: "Embed Youtube Video or Playlist",
            description: <span>Copy & Paste a Youtube video url below to embed a YouTube Video or Playlist into this routine.</span>,
            type: "embed",
            onSubmit: linkYoutube,
        },
    ];
    const isTablet = useMediaQuery({ query: device.tablet})


    /**
     * Updates our Routine formData object in reaction to an axios "PATCH" request
     * @param {Object} response - the response from the PATCH request
     */
    function updateTimerSet(response) {
        if (response) {
            setFormData(response);
            label.current = response.label;
        } else {
            console.log("Response was null");
        }
    }
    /**
     * Get timer set with this id
     */
    React.useEffect(() => {
        const getTimerSet = async () => {
            // if(user && user.role == "admin"){
                let options = {
                    method: "GET",
                    pathsArray: ["factory", id],
                    setStateCallback: updateTimerSet,
                };
            await requests.axiosRequest(options);
        };
        getTimerSet();
        return () => {};
    }, [id]);
   

    //when timer data changes, update the entire set of timers timer
    React.useEffect(() => {
        if (formData) {
            let options = {
                method: "PATCH",
                pathsArray: ["factory", id],
                data: {
                    label: formData.label,
                    youtubeLink: formData.youtubeLink,
                    spotifyLink: formData.spotifyLink,
                    timers: formData.timers,
                    repeatNumber: formData.repeatNumber,
                    autoBreakTime: formData.autoBreakTime,
                    autoBreakTimer: formData.autoBreakTimer
                },
            };
            requests.axiosRequest(options);
        }
    }, [formData, id]);

    //handle intersecting specific elements
    /**
     * useEffect callback -- handles intersecting certain elements
     */
    React.useEffect(() => {
        const scrollArea = scrollRef.current;
        let callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    //change the theme
                    if (entry.target.classList.contains("break")) {
                        //if this is a break and we're on primary theme
                        //switch to seocndary theme
                        // if (themeName !== "secondary") {
                        updateTheme("secondary");
                        // }
                    } else {
                        //if we're not intersecting a break
                        //but we're on secondary theme
                        //switch to primary theme

                        updateTheme("primary");
                    }
                    //notify children which one is being hovered
                    if (entry.isIntersecting) {
                        timerInView.current = entry.target.firstChild.dataset.key;
                        setCurrentTimer(timerInView.current);
                    }
                }
            });
        };
        let options = {
            root: scrollArea,
            rootMargin: "0px",
            threshold: 0.7,
        };
        observer.current = new IntersectionObserver(callback, options);
        childRefs.current.forEach((child) => {
            if (child === null) {
                return;
            }
            return observer.current.observe(child);
        });
        // let refs = childRefs.current;
        return () =>
            childRefs.current.forEach((child) => {
                if (child === null) {
                    return;
                }
                // console.log(child)
                return observer.current.unobserve(child);
            });
    }, [formData.timers, updateTheme]);

    // #endregion
    /* -------------------------------- functions ------------------------------- */
    // #region functions

    /**
     *
     * @param {any} data - add link to spotify
     */
    function linkSpotify(data) {
        setFormData((oldData) => {
            return { ...oldData, spotifyLink: data };
        });
    }
    function linkYoutube(data) {
        setFormData((oldData) => {
            return { ...oldData, youtubeLink: data };
        });
    }

    function closeModal() {
        setShowModal({ isOpen: false, currentModalIndex: -1 });
    }

    /**
     * Update a specific individual timer within the set
     * @param {Object} data - the update data
     * @param {id} id = the id of the timer we're updating
     */
    function updateSpecificTimer(data, id) {
      /*   console.log(
            "Updating",
            data,
            formData.timers?.filter((timer) => timer._id === id).pop()
        );
        console.log({
            timers: formData.timers?.map((timer)=> timer._id === id ? {...timer, ...data} : timer)
        }) */
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                timers: prevFormData.timers?.map((oldTimer) =>
                    oldTimer._id === id ? { ...oldTimer, ...data } : oldTimer
                ),
            };
        });
    }

    /**
     * Toggles various UI elements like certain modals and changing back and forth from sort mode
     * @param {String} property - the name of the property we're toggling
     * @param {*} value - the value we're changing the property to
     */
    function updateUiToggles(property, value){
        setUiToggles((prevValue)=> {
            return {
                ...prevValue,
                [property]: value
            }
        })


    }

    /**
     * Deletes a timer by its ID 
     * @param {String} id - the id of the timer to delete
     */
    function deleteTimer(id) {
        // console.log("Deleting timer: ", id);

        //find the timer we're deleting
        let deletedElement = childRefs.current.find((element) => element.firstChild.dataset.key === id);
        //unobserve it, store its index
        // console.log(deletedElement)
        observer.current.unobserve(deletedElement);
        let index = childRefs.current.indexOf(deletedElement);

        //remove it from referenced children
        childRefs.current.splice(index, 1);

        //remove it from timer data after a bit
        let filteredTimers = formData.timers.filter(timer => timer._id !== id)
        setTimeout(()=> updateFormData("timers", [...filteredTimers]), 100);
            // updateFormData("timers", [...formData.timers.filter((timer) => timer._id !== id)]),
        // );
    }

    /**
     * Scrolls into view the specific timer that matches this id.
     * @param {String} id - the id of a timer
     */
    function navigateToTimer(id) {
        const matchElement = childRefs.current.find((el) => el.firstChild.dataset.key === id);
        matchElement.scrollIntoView({ behavior: "smooth" });
    }

    /**
     * - updates all of the exercise timers in this routine
     * @param {Array} data - the timer array w/ updated timer objects within
     */
    function updateAllTimers(data) {
        updateFormData("timers", [...data]);
    }

    /**
     * Navigates to the "Display" of this particular exercise routine by id
     */
    function navigateToDisplay() {
        let id = formData._id;
        navigate(`/dashboard/display/${id}`);
    }

    /**
     * Action Factory Objects to store data about buttons, icons, and their data
     */
    const actionData = [
        ActionFactory(
            "startRoutine", 
            "play_circle", 
            ()=> navigateToDisplay(),
            "Start the Routine"
        ),
        ActionFactory(
            "addMediaLink",
            "add_link",
            ()=> {
                setShowModal({isOpen: true, currentModalIndex: 1})
            },
            "Add a link to a YouTube video, Spotify track, or playlist"
        ),
      
        ActionFactory(
            "addSpotifyLink", 
            "music_note", 
            (event)=>{
                setShowModal({ isOpen: true, currentModalIndex: 0 });
            }, 
            "Add a link to a spotify playlist"
        ),
        ActionFactory(
            "addYoutubeLink", 
            "youtube_activity", 
            (event)=>{
                setShowModal({ isOpen: true, currentModalIndex: 1 });
            }, 
            "Add a link to a YouTube video or playlist"
        ),
    ]



    /**
     * handle different actions when we click upon buttons
     * @param {*} event - the click event
     */
    async function handleClick(event) {
        event.preventDefault();
        const element = event.target;
        const action = element.dataset.action;
        switch (action) {
            case "add-spotify-link":
                setShowModal({ isOpen: true, currentModalIndex: 0 });
                break;
            case "add-youtube-link":
                setShowModal({ isOpen: true, currentModalIndex: 1 });
                break;
            case "save":
                await saveNewTimer();
                break;
            case "start-timer":
                navigateToDisplay();
                break;
            case "auto-breaks":
                console.log("Automatically adding breaks for timers")
                break;
            default:
                console.log("No associated action for", action);
                break;
        }
    }

    /**
     * Saves a newly created timer
     */
    async function saveNewTimer() {
        if (formData.label) {
            const options = {
                method: "POST",
                pathsArray: ["factory", "new"],
                setStateCallback: (data) => {
                    console.log("Saving?", data);
                    if (data) setSaved(true);
                },
                data: {
                    _id: formData._id,
                    label: formData.label,
                    youtubeLink: formData.youtubeLink,
                    spotifyLink: formData.spotifyLink,
                    timers: formData.timers,
                    repeatNumber: formData.repeatNumber,
                    autoBreakTime: formData.autoBreakTime,
                    autoBreakTimer: formData.autoBreakTimer
                },
            };
            await requests.axiosRequest(options);
        }
    }

 
    //update all the data in the form
    const updateFormData = useCallback(async (property, data) => {
        // console.log("Updating", property, data);
        setFormData((prevData) => {
            return {
                ...prevData,
                [property]: data,
            };
        });
    }, []);
    //we've created and saved a new timer, so navigate to the stored reference of the id
    if (saved === true && `/factory/${storedRef.current}` !== location.pathname) {
        return <Navigate to={`/factory/${storedRef.current}`} />;
    }

    /**
     * The objects representing the preview timers (and their wrappers)
     */
    const previewTimers = formData
        ? formData.timers?.map((timer, index) => (
              <div
                  className={`timer-holder ${timer.isBreak ? "break" : ""}`}
                  key={timer._id}
                  ref={(element) => {
                      childRefs.current[index] = element;
                  }}
                  datakey={timer._id}
              >
                  <PreviewTimer
                      number={index + 1}
                      key={timer._id}
                      id={timer._id}
                      isBreak={timer.isBreak}
                      isRep={timer.isRep}
                      time={timer.time}
                      autostart={timer.autostart}
                      description={timer.description}
                      label={timer.label}
                      updateTimerData={updateSpecificTimer}
                      slideImagePath={timer.slideImagePath}
                      repeatNumber={timer.repeatNumber}
                      theme={theme}
                  />
              </div>
          ))
        : [];

    //handle change event on the form
    function handleChange(event) {
        let { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }
    function isSavedTimer() {
        return id !== "new";
    }
    /**
     *
     * @param {int} position - the index of the particular timer in the current array;
     * @param {boolean} beforeOrAfter - whether we want to add a new timer before or after
     * @param {boolean} duplicate - whether or not we want to duplicate the timer
     */
    async function addNewTimer(position, beforeOrAfter, duplicate = false) {
        let insertAtIndex = position + beforeOrAfter;
        // console.log({position, beforeOrAfter}, formData.timers[position])
        const newTimerData = !duplicate ? {
            // _id: "new",
            time: { hours: 0, seconds: 0, minutes: 0 },
            label: "New Timer",
            slideImagePath: "",
            description: "",
            autostart: false,
            isBreak: false,
            repeatNumber: 0,
        } : helpers.cloneObject(formData.timers[position], true) 

        //delete the id 
        if(duplicate){
            delete newTimerData._id
        }

        // debugger
        //make sure it doesn't go over or under
        if (insertAtIndex < 0) {
            insertAtIndex = 0;
        } else if (insertAtIndex > formData.timers.length) {
            insertAtIndex = formData.timers.length - 1;
        }

        //!Note: Splice modifies original array, but returns objects you removed
        //! will be empty if nothing is removed
        if (formData.timers) {
            let newArray = [...formData.timers];
            newArray.splice(insertAtIndex, 0, { ...newTimerData });
            // setTimeout(()=> updateFormData("timers", newArray), 100)
            await updateFormData("timers", newArray);
          
        }
    }

    // #endregion

    // ====================================================== //
    // ==================RETURN STATEMENT ========================= //
    // ====================================================== //

    return (
        <GalleryWrapper className="timer-gallery" style={{ position: "relative" }}>
            <ThemeProvider theme={theme}>
                {formData && Object.keys(formData).length > 0 && (
                    <GalleryHeader
                        actions={actionData}
                        expanded={expanded}
                        setExpanded={() => setExpanded((prevData) => !prevData)}
                        updateFormData={updateFormData}
                        handleClick={handleClick}
                        handleChange={handleChange}
                        formData={formData}
                        isSavedTimer={isSavedTimer}
                        uiToggles={uiToggles}
                        setUiToggles={updateUiToggles}
                        isTablet={isTablet}
                    ></GalleryHeader>
                )}
                <RoutineTimeline
                    sortMode={uiToggles.sortMode}
                    timerInView={currentTimer}
                    addNewTimer={addNewTimer}
                    timers={formData.timers || []}
                    setParentTimers={updateAllTimers}
                    deleteParentTimer={deleteTimer}
                    navigateToParentTimer={navigateToTimer}
                    // duplicateParentTimer={duplicateTimer}
                />

            </ThemeProvider>
            {/* TIMERS */}
            <ThemeProvider theme={theme}>
                <TimerWrapper theme={theme} className="timer-wrapper" ref={scrollRef}>
                    {previewTimers}
                </TimerWrapper>
            </ThemeProvider>
            {uiToggles.showAutoBreak && <AutoBreakConfig 
                timer={formData && formData.autoBreakTimer}
                time={formData ? formData.autoBreakTime : {hours: 0, minutes: 0, seconds:5}}
                updateFormData={updateFormData}
            />}
            {showModal.isOpen && (
                <ActionModal
                    open={showModal.isOpen}
                    title={modalInfo[showModal.currentModalIndex].name}
                    description={modalInfo[showModal.currentModalIndex].description}
                    type={modalInfo[showModal.currentModalIndex].type}
                    primaryAction={modalInfo[showModal.currentModalIndex].onSubmit}
                    secondaryAction={closeModal}
                    cancelAction={closeModal}
                    currentValue={formData[modalInfo[showModal.currentModalIndex].name]}
                ></ActionModal>
            )}
        </GalleryWrapper>
    );
}
