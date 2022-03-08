import LinkNameInput from "./components/LinkNameInput";
import LinkDisplay from "./components/LinkDisplay";
import Dashboard from "./components/Dashboard";

import ModalContainer from "./components/ModalContainer";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import TagChips from "./components/TagChips";
import { useParams, useLocation, Route, Routes, Link, Outlet } from "react-router-dom";
import {
    StyledInlineLink,
    StyledNavBar,
    StyledNavLink,
} from "./components/styled-components/nav.styled";
import axios from "axios";
import IndividualLink from "./components/IndividualLink";

const Global = createGlobalStyle`
	:root{
  --clr-primary-deep-dark: #171529;
  --clr-primary-dark: #25203f;
  --clr-primary-base: #342E57;
  --clr-accent: #6495ed;
	}

`;

const StyledContainer = styled.div`
    flex: 1;
    background-color: #171529;
    padding: 2rem 3rem;
    border-radius: 15px;
    display: flex;
    width: 100%;
    margin: 0 auto;
    max-height: 100vh;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: center; */
`;
const ThickerContainer = styled(StyledContainer)`
    width: 100%;
    nav {
        overflow: visible;
        width: 100%;
    }
`;

function App() {
    const location = useLocation();
    const background = location.state && location.state.background;
    function determineClickedElement(event) {
        console.log(event.target);
    }
    return (
        <StyledContainer className="App" onClick={determineClickedElement}>
            <Global></Global>
            <Routes location={background || location}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="display" element={<LinkDisplay />}>
                        <Route path=":id" element={<LinkNameInput />}></Route>
                        <Route path="internal/:id" element={<ModalContainer />} />
                    </Route>
                    <Route path="create" element={<LinkNameInput />}>
                        <Route path="new" element={<LinkNameInput />}></Route>
                        {/* <Route path=":id" element={<LinkNameInput />}></Route> */}
                    </Route>
                </Route>
            </Routes>
            {background && (
                <Routes>
                    <Route path="create/:id" element={<LinkNameInput modal={true} />} />
                    <Route
                        path="display/internal/:id"
                        element={<ModalContainer />}></Route>
                </Routes>
            )}
        </StyledContainer>
    );
}

function Layout() {
    return (
        <ThickerContainer>
            <nav>
                <StyledNavBar>
                    <StyledNavLink underlineColor="#8e7eef">
                        <Link to="/">Dashboard</Link>
                    </StyledNavLink>
                    <StyledNavLink underlineColor="#8e7eef">
                        <Link to="/display">Link Display</Link>
                    </StyledNavLink>
                </StyledNavBar>
            </nav>

            <Outlet />
        </ThickerContainer>
    );
}

export default App;
