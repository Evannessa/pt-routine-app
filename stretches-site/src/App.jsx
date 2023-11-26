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
} from "./pages";
import { requests } from "./helpers/requests";
import TimerSets from "./components/TimerSets";
import React, { useState, useEffect } from "react";
import TimerFactory from "./components/TimerFactory";
import ActiveTimerDisplay from "./components/ActiveTimerDisplay";
import TimerGallery from "./components/TimerGallery";
import styled from "styled-components";
import GlobalStyle from "./components/styled-components/globalStyles";
import { useGlobalContext } from "./context";
import Navbar from "./components/Navbar";

// #region Styled Components & Themes
export const themes = {
    primary: {
        color1: "#fd6e2b",
        color2: "#f02e5f",
        gradient: "linear-gradient(45deg, #fd6e2b, #f02e5f)",
        shadow: "2px 2px 3px hsla(0, 62%, 39.2%, 0.43)",
        dark: "hsla(349, 68%, 11%, 1)"
    },
    secondary: {
        color1: "#25C6DC",
        color2: "#547cf5",

        gradient: "linear-gradient(45deg, #25C6DC, #514A9D)",
        shadow: "2px 2px 3px hsla(244, 62%, 39%, 0.43)",
        dark: "hsla(244, 63%, 15%, 1)"
    },
    tertiary:{
        color1: "#8f94fb",
        color2: "#4e54c8",
        gradient: "linear-gradient(45deg, #25C6DC, #514A9D)",
        shadow: "2px 2px 3px hsla(244, 62%, 39%, 0.43)",
    }
// background: linear-gradient(to left, #8E54E9, #4776E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
// background: linear-gradient(to left, #12FFF7, #B3FFAB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
// #AAFFA9 to #11FFBD

};

export const ThemeContext = React.createContext({
    theme: themes.primary,
    updateTheme: () => {
        console.log("toggle?");
    },
    themeName: "primary",
    altTheme: themes.secondary
});
//can't transition gradients, so doing workaround with pseudo element
const StyledApp = styled.div`
* {
    scrollbar-width: thin !important;
    box-sizing: border-box;
}
    grid-template-rows: minmax(10px, 32px) 1fr;
    color: ${(props) => props.theme.color1};
    /* background-image: ${({ theme }) => theme.gradient}; */
    background-image: ${(props) => props.primaryGradient};
    transition: all 0.45s linear;
    overflow-y: hidden;
    max-height: 100vh;
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
    const [themeState, setThemeState] = useState({
        theme: themes.primary,
        updateTheme: updateTheme,
        themeName: "primary",
    });

    function updateTheme(themeName) {
        setThemeState((previousThemeState) => {
            return {
                ...previousThemeState,
                theme: themes[themeName],
                themeName: themeName,
            };
        });
    }

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
                {/* <Navbar /> */}
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/register" exact element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="factory" element={<TimerFactory />}>
                            <Route path=":setId" element={<TimerGallery />}></Route>
                        </Route>
                        <Route path="display/:setId" element={<ActiveTimerDisplay />}></Route>
                    </Route>
                    {/* <Route exact path="user" element={<ProtectedRoute />}> */}
                    {/* </Route> */}
                    <Route path="/forgot-password" exact element={<ForgotPassword />} />
                    <Route path="/user/verify-email" exact element={<Verify />} />
                    <Route path="/user/reset-password" exact element={<ResetPassword />} />
                    <Route path="*" element={<Error />} />
                </Routes>
                <Outlet />
            </StyledApp>
        </ThemeContext.Provider>
    );
}

export default App;
