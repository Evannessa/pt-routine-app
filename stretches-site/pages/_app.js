import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import "../styles/App.css";
import Timer from "../components/Timer";
import CountTimer from "../components/CountTimer";
import ProgressCircle from "../components/ProgressCircle";
import { nanoid } from "nanoid";
import Slide from "../components/Slide";
import TimerFactory from "../components/TimerFactory";
import ActiveTimerDisplay from "../components/ActiveTimerDisplay";

function App() {
    const [page, setPage] = React.useState(1);

    function switchPages() {
        console.log("Switching");
        page === 0 ? setPage(1) : setPage(0);
    }

    return (
        <div className="App">
            {page === 1 && <TimerFactory />}
            {page === 0 && <ActiveTimerDisplay />}
            <button className="fab" onClick={switchPages}>
                Switch
            </button>
        </div>
    );
}

export default App;
