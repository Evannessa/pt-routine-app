import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";
import guitarPhoto from "../images/GuitarPhoto.jpg"
import { urls } from "../helpers/requests";
import cannotLoad from "../images/cannot_load.jpg"

const StyledNavLink = styled(NavLink)`
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    /* aspect-ratio: 1/1; */
    display: inline-flex;
   
 
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    color: ${(props) => props.themeColor1 || "white"};
    div.timerSet__wrapper{
        justify-self: flex-end;
        width: 100%;
        max-height: 100%;
        max-width: 100%;
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: 20% 80%;
        align-items: center;
        gap: 0.25rem;
        .timerSet__img{
            grid-column: 1/2;
            border-radius: 8px;
            padding: 0.5rem;
        }
        .timerSet__content{
            grid-column: 2/3;
        }
    }
    .text-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0.25rem;
        .label{
            font-weight: bold;
            font-size: 1.05rem;
        }
        .number{
            font-size: 0.95rem;
        }
    }
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
        max-height: 100%;
        object-position: center;
    }
    > div{
      
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
    const {urlBaseNoApi} = urls
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
                <div className="timerSet__wrapper">
                    {timerSetStyle === "card" && 
                    <img className="timerSet__img" src={urlBaseNoApi + cardImagePath} alt={cardImageLabel} 
                     crossOrigin="true" onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src= cannotLoad; }}/>
                    }
                    <section className="timerSet__content">
                        
                        <div class="text-wrapper">
                            {timerSet.label ? <p className="label">{timerSet.label}</p> : ""}
                            {<p className="number">  {timerSet.timers.length - 1} Exercises</p>}
                        </div>
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
