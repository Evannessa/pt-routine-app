import React, { useState } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import { ThemeContext } from "../App";
import { Link, Navigate } from "react-router-dom";
import { device } from "../components/styled-components/devices";
import { useGlobalContext } from "../context";
function Home() {
    const { theme } = React.useContext(ThemeContext);
    const { user, isLoading } = useGlobalContext();

    if (isLoading) {
        return (
            <section className="page page-center">
                <div className="loading"></div>
            </section>
        );
    }
    // #endregion
    return (
        <>
            {user && <Navigate to="/dashboard" />}
            <ThemeProvider theme={theme}>
                <Wrapper className="page">
                    <div className="info">
                        <h2>
                            <span>Auth</span>
                            Workflow
                        </h2>
                        <p>
                            I'm baby viral enamel pin chartreuse cliche retro af selfies kinfolk photo booth plaid
                            jianbing actually squid 3 wolf moon lumbersexual. Hell of humblebrag gluten-free lo-fi man
                            braid leggings.
                        </p>
                        <p>
                            Cloud bread kale chips wayfarers deep v chicharrones leggings fingerstache actually blog
                            cliche four dollar toast. Sriracha ugh kickstarter, next level la croix butcher lomo.
                        </p>
                        <div class="button-wrapper">
                            <Link to="/login" className="btn">
                                Login
                            </Link>
                            <Link to="/register" className="btn">
                                Register
                            </Link>
                        </div>
                    </div>
                    <div className="image"></div>
                </Wrapper>
            </ThemeProvider>
        </>
    );
}

const Wrapper = styled.div`
    box-sizing: border-box;    
    margin: auto;
    background-color: white;
    display: grid;
    grid-template-rows: 100px 1fr;
    min-height: 300px;
    @media ${device.mobileL} {
        width: 90%;
    }
    @media ${device.tablet} {
        width: clamp(500px, 60vw, 800px);
        grid-template-columns: 60% 40%;
        grid-template-rows: 100%;
        align-items: center;
    }
    @media ${device.laptop}{
        column-gap: 0;
    }
    margin-right: auto;
    margin-left: auto;
    margin-bottom: auto;
    /* margin-top: auto; */
    border-radius: 10px;
    overflow: hidden;
    /* width: clamp(500px, 60vw, 800px);  */
    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        grid-column: 1/2;
        grid-row: 2/3;
        padding: clamp(2rem, 2rem + 1vw, 3rem);
        max-height: 100%;
        @media ${device.tablet} {
            grid-column: 1/2;
            grid-row: 1/2;
            grid-template-columns: 60% 40%;
            align-items: center;
        }
        > * + * {
            margin-top: 1rem;
        }
        .button-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 2rem;
            .btn {
                display: inline-flex;
                text-align: center;
                min-height: 2rem;
                display: grid;
                justify-content: center;
                align-items: center;
                border-radius: 8px;
                ${(props) =>
                    css`
                        --color-1: ${props.theme.color1};
                        --color-2: ${props.theme.color2};
                        background: linear-gradient(-45deg, var(--color-1), var(--color-2));
                    `}
                transform: scale(1);
                transition: transform 200ms ease-in;
                &:hover {
                    transform: scale(1.05);
                }
                color: white;
                width: 100%;
            }
        }
    }
    .image {
        grid-column: 1/2;
        grid-row: 1/2;
        @media ${device.tablet} {
            grid-column: 2/3;
            grid-row: 1/2;
        }
        background-image: url("/assets/pexels-ketut-subiyanto-4473608.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        height: 100%;
    }
    h2,
    p {
        color: black;
    }

    h2 {
        font-weight: 700;
    }
    h2 span {
        color: var(--primary-500);
    }
    .main-img {
        display: none;
    }
    @media (min-width: 992px) {
        grid-template-columns: 1fr 1fr;
        column-gap: 3rem;
        .main-img {
            display: block;
        }
    }
    .btn {
        margin-left: 0.25rem;
        margin-right: 0.25rem;
    }
`;

export default Home;
