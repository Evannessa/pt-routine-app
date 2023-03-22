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
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path='/login' exact element={<Login />} />
                    <Route path='/register' exact element={<Register />} />
                    <Route exact path="/dashboard" element={<ProtectedRoute />}>
                        <Route path='/dashboard' exact element={<Dashboard />} />
                    </Route>
                    <Route path='/forgot-password' exact element={<ForgotPassword />} />
                    <Route path='/user/verify-email' exact element={<Verify />} />
                    <Route path='/user/reset-password' exact element={<ResetPassword />} />
                    <Route path='*' element={<Error />} />
                </Routes>


                <Outlet />
            </StyledApp>
        </ThemeContext.Provider>
    );
}

export default App;
