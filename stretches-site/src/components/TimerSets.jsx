import React from "react";
import styled from "styled-components";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import { Container } from "./styled-components/layout.styled";
import { requests } from "../helpers/requests";

const FlexContainer = styled(Container)`
    display: flex;
    max-width: 500px;
    z-index: 999;
`;

export default function TimerSets(props) {
    const navigate = useNavigate();
    const wrapperRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    let { timerSets, updateSets } = props;
    // const [timerSets, setTimerSets] = React.useState(null);

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
              return (
                  <NavLink
                      to={`display/${timerSet._id}`}
                      className={(isActive) => "timerSet nav-link" + (isActive ? " selected" : "")}
                      key={timerSet._id}
                      data-id={timerSet._id}
                  >
                      {timerSets && (
                          <div className="timerSet__content">
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
                              {/* {timerSet.time.hours}:{timerSet.time.minutes}:
                              {timerSet.time.seconds} */}
                          </div>
                      )}
                  </NavLink>
              );
          })
        : null;
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
