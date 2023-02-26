import React from "react";
import App from "./_app";
import Timer from "../components/Timer";
import CountTimer from "../components/CountTimer";
import ProgressCircle from "../components/ProgressCircle";
import { nanoid } from "nanoid";
import Slide from "../components/Slide";
import TimerFactory from "../components/TimerFactory";
import { CSSTransitionGroup } from "react-transition-group";
import ActiveTimerDisplay from "../components/ActiveTimerDisplay";

function Index() {
    return <App />;
}

export default App;
