import "./styles/App.css";
import { Route, Routes, Outlet, useNavigate, Switch } from "react-router-dom";
import {
    Home,
    Error,
    Register,
    Login,
    Verify,
    Dashboard,
    ProtectedRoute,
    ForgotPassword,
    ResetPassword,
} from './pages';
import { requests } from "./helpers/requests";
import TimerSets from "./components/TimerSets";
import React, { useState, useEffect } from "react";
import TimerFactory from "./components/TimerFactory";
import ActiveTimerDisplay from "./components/ActiveTimerDisplay";
import TimerGallery from "./components/TimerGallery";
import styled from "styled-components";
import GlobalStyle from "./components/styled-components/globalStyles";
import { useGlobalContext } from "./context"
import Navbar from "./components/Navbar";

// #region Styled Components & Themes
export const themes = {
    primary: {
        color1: "#fd6e2b",
        color2: "#f02e5f",
        gradient: "linear-gradient(#fd6e2b, #f02e5f)",
    },
    secondary: {
        color1: "#25C6DC",
        color2: "#514A9D",
        gradient: "linear-gradient(#25C6DC, #514A9D)",
    },
};

export const ThemeContext = React.createContext({
    theme: themes.primary,
    updateTheme: () => {
        console.log("toggle?");
    },
    themeName: "primary",
});
//can't transition gradients, so doing workaround with pseudo element
const StyledApp = styled.div`
* {
    scrollbar-width: thin !important;
}
    color: ${(props) => props.theme.color1};
    /* background-image: ${({ theme }) => theme.gradient}; */
    background-image: ${(props) => props.primaryGradient};
    transition: all 0.45s linear;
    &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-image: ${(props) => props.secondaryGradient};
        opacity: ${(props) => (props.themeName === "primary" ? "0%" : "100%")};
        z-index: 0;
        transition: opacity 0.45s linear;
        pointer-events: none;
    }
`;
// #endregion;

function App() {
    const { user } = useGlobalContext()
    const { name, userId, role } = user
    const { isLoading } = useGlobalContext

    /* ---------------------- React Hooks, State and Effect --------------------- */
    // #region Hooks, State and Effect
    const navigate = useNavigate();
    const [timerSets, setTimerSets] = useState();
    const [themeState, setThemeState] = useState({
        theme: themes.primary,
        updateTheme: updateTheme,
        themeName: "primary",
    });

    useEffect(() => {
        localStorage.setItem("timerSets", JSON.stringify(timerSets))
    }, [timerSets])


    function updateTimerSets(response) {
        if (response != null) {
            setTimerSets(response);
        }
    }
    /**
     * Create a new timer set
     */
    async function createNewSet() {
        if (user && role === "admin") {
            let options = {
                method: "POST",
                pathsArray: ["factory", "new"],
                setStateCallback: (info) => {
                    const newId = info._id
                    navigateToFactory(newId)
                    getTimerSets()
                },
            };
            await requests.axiosRequest(options);
        } else {
            console.log("Not admin")
        }

    }

    function getTimerSets() {
        if (user && role === "admin") {
            let options = {
                method: "GET",
                pathsArray: ["factory", "/"],
                setStateCallback: updateTimerSets,
            };
            requests.axiosRequest(options);
        } else {
            console.log("Can't get sets -- not admin")
        }
    }

    /**
     * get all of the timer sets
     */
    useEffect(getTimerSets, []);
    // #endregion

    /* -------------------------------- functions ------------------------------- */
    // #region Functions

    function updateTheme(themeName) {
        setThemeState((previousThemeState) => {
            return {
                ...previousThemeState,
                theme: themes[themeName],
                themeName: themeName,
            };
        });
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
    }

    if (isLoading) {
        return (
            <section className='page page-center'>
                <div className='loading'></div>
            </section>
        );
    }
    // #endregion

    return (
        <ThemeContext.Provider value={themeState}>
            <StyledApp
                className="App"
                theme={themeState.theme}
                themeName={themeState.themeName}
                primaryGradient={themes.primary.gradient}
                secondaryGradient={themes.secondary.gradient}

            >
                <GlobalStyle />

                {/* <TimerSets timerSets={timerSets} updateSets={updateSets} /> */}
                <Navbar />
                <Routes>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path='/login' exact>
                        <Login />
                    </Route>
                    <Route path='/register' exact>
                        <Register />
                    </Route>
                    <ProtectedRoute path='/dashboard' exact>
                        <Dashboard />
                    </ProtectedRoute>
                    <Route path='/forgot-password' exact>
                        <ForgotPassword />
                    </Route>
                    <Route path='/user/verify-email' exact>
                        <Verify />
                    </Route>
                    <Route path='/user/reset-password' exact>
                        <ResetPassword />
                    </Route>
                    <Route path='*'>
                        <Error />
                    </Route>
                </Routes>

                {/* <Routes>
                    <Route path="/" element={<Dashboard timerSets={timerSets} />}></Route>
                    <Route path="factory" element={<TimerFactory />}>
                        <Route
                            path=":setId"
                            element={
                                <TimerGallery
                                    timerSets={timerSets}
                                    getTimerSets={getTimerSets}
                                    saved={true}
                                />
                            }
                        ></Route>
                    </Route>
                    <Route
                        path="display/:setId"
                        element={<ActiveTimerDisplay />}
                    ></Route>
                </Routes> */}
                <Outlet />
            </StyledApp>
        </ThemeContext.Provider>
    );
}

export default App;
