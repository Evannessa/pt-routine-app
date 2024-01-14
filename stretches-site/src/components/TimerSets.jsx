import React from "react";
import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";
import { Container } from "./styled-components/layout.styled";
import { requests } from "../helpers/requests";
import TimerSetCard from "./TimerSetCard";

const FlexContainer = styled(Container)`
    display: flex;
    max-width: 500px;
    z-index: 999;
`;

export default function TimerSets(props) {
    const wrapperRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    let { timerSets, updateSets, timerSetStyle } = props;

    async function handleBlur(event) {
        console.log("Blur now");
        // setOpen((prevState) => !prevState);
    }
    async function handleClick(event) {
        event.stopPropagation();
        event.preventDefault();
        let el = event.currentTarget;
        let id = el.dataset.id;
        let action = el.dataset.action;
        updateSets(action, id);
    }

    const timerSetElements = timerSets
        ? timerSets.map((timerSet) => {
              if (!timerSetStyle) timerSetStyle = "nav-link";
              return <TimerSetCard timerSet={timerSet} key={timerSet._id} timerSetStyle="link"></TimerSetCard>;
          })
        : [];
    function toggleDrawer(event) {
        setOpen((prevState) => !prevState);
    }

    return (
        <FlexContainer full={true} className="timerSet-wrapper" onBlur={handleBlur} ref={wrapperRef}>
            <button
                className={`timerSet__drawer-toggle-btn ${open && "open"}`}
                styles={{ "z-index": 30 }}
                onClick={toggleDrawer}
            >
                <span className="material-icons">{open ? "close" : "menu"}</span>
            </button>

            <div className={`timerSet__container ${open ? "open" : ""}`}>
                <button className="ghost full-width" data-action="create" onClick={handleClick}>
                    <span className="material-icons">add</span>Create New Timer Set
                </button>
                {timerSetElements}
            </div>
            <Outlet />
        </FlexContainer>
    );
}
