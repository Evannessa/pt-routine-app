import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
    background-color: white;
    border-radius: 10px;
    padding: 1rem;
    color: ${(props) => props.themeColor1 || "black"};
    p,
    button {
        color: ${(props) => props.themeColor1 || "black"};
    }
`;

function TimerSetCard({ timerSet, updateSets, timerSetStyle = "link" }) {
    const cardImagePath = timerSet.timers[0].slideImagePath;
    const cardImageLabel = timerSet.timers[0].label;
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
    return (
        <StyledNavLink
            to={`display/${timerSet._id}`}
            className={(isActive) => "timerSet nav-link" + (isActive ? " selected" : "")}
            data-id={timerSet._id}
        >
            {timerSet && (
                <div className="timerSet__content">
                    {timerSetStyle === "card" && <img src={cardImagePath} alt={cardImageLabel} />}
                    {timerSet.label ? <p>{timerSet.label}</p> : ""}
                    <div className="button-wrapper">
                        <button
                            className="btn icon__btn"
                            onClick={handleClick}
                            data-id={timerSet._id}
                            data-action="edit"
                        >
                            <span className="material-icons">edit</span>
                        </button>
                        <button
                            className="btn icon__btn"
                            onClick={handleClick}
                            data-id={timerSet._id}
                            data-action="delete"
                        >
                            <span className="material-icons">delete</span>
                        </button>
                    </div>
                </div>
            )}
        </StyledNavLink>
    );
}

export default TimerSetCard;
