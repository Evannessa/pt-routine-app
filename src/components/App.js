import "../styles/App.css";
import Timer from "./Timer";
import CountTimer from "./CountTimer";
import ProgressCircle from "./ProgressCircle";
import { nanoid } from "nanoid";
import React from "react";
import Slide from "./Slide";
import TimerFactory from "./TimerFactory";
import { CSSTransitionGroup } from "react-transition-group";
import ActiveTimerDisplay from "./ActiveTimerDisplay";

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
