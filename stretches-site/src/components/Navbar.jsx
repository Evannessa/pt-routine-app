import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { Icon, ButtonWithIcon } from "./styled-components/Buttons.Styled";
import { TooltipWrapper } from "../portal-components/TooltipPopover";

// const StyledToolbar = styled.`
  
// `;
const Navbar = () => {
    const { user, logoutUser } = useGlobalContext();
    return (
        <Wrapper>
            <div className="nav-center">
                <StyledLink to="/dashboard" className="home-link">
                   <Icon icon={"home"}></Icon> 
                    Home
                </StyledLink>
                {user && (
                    <div className="nav-links">
                        <p>hello, {user.name}</p>
                        <button
                            className="btn btn-small"
                            onClick={() => {
                                logoutUser();
                            }}
                        >
                            logout
                        </button>
                    </div>
                )}
            </div>
                <ButtonWithIcon icon={"help"} className="help"></ButtonWithIcon>
        </Wrapper>
    );
};

const StyledLink = styled(Link)`
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    text-align: center;
`;



const Wrapper = styled.nav`
    /* margin-left: 5rem; */
    padding-inline: 2rem;
    position: fixed;
    z-index: 900;
    background: var(--white, white);
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .nav-center {
        width: var(--fluid-width);
        max-width: var(--max-width);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }
    .nav-links {
        display: flex;
        flex-direction: column;
    }
    .nav-links p {
        margin: 0;
        text-transform: capitalize;
        margin-bottom: 0.25rem;
    }
    .help{
        margin-left: auto;
    }
 
    @media (min-width: 776px) {
        .nav-links {
            flex-direction: row;
            align-items: center;
        }
        .nav-links p {
            margin: 0;
            margin-right: 1.5rem;
        }
    } ;
`;

export default Navbar;
