import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";
import guitarPhoto from "../images/GuitarPhoto.jpg"

const StyledNavLink = styled(NavLink)`
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    /* aspect-ratio: 1/1; */
 
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    color: ${(props) => props.themeColor1 || "white"};
    p,
    button {
        color: hsl(348.7, 100%, 55.1%);
        /* color: ${(props) => props.themeColor1 || "white"}; */
    }
    transform: scale(1);
    transition: transform 200ms ease-in;
    &:hover {
        transform: scale(1.05);
    }
    img{
        max-width: 100%;
        object-fit: cover;
    }
    > div{
        max-height: 100%;
        max-width: 100%;
        /* padding: 1rem; */
        display: grid;
    }
    section{
        padding: 1rem;
        display: flex;
        justify-content: space-between;
       
        .button-wrapper{
            width: unset;
        }
    }
    img, section{
        grid-row: 1/2;
        grid-column: 1/2;
    }
`;

function TimerSetCard({ timerSet, updateSets, timerSetStyle = "link", isMockData=false }) {
    const cardImagePath = timerSet.timers[0].slideImagePath;
    const cardImageLabel = timerSet.timers[0].label;

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
            // className={`timerSet nav-link ${isActive ? " selected" : ""}`}
            data-id={timerSet._id}
        >
            {timerSet && (
                <div className="timerSet__content">
                    {timerSetStyle === "card" && <img src={cardImagePath} alt={cardImageLabel} />}
                    <section>
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
                    </section>
                </div>
            )}
        </StyledNavLink>
    );
}

export default TimerSetCard;
