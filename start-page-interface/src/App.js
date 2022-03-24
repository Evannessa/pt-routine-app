import LinkNameInput from "./components/LinkNameInput";
import LinkDisplay from "./components/LinkDisplay";
import Dashboard from "./components/Dashboard";

import ModalContainer from "./components/ModalContainer";
import "./App.css";
import { useLocation, Route, Routes, Outlet } from "react-router-dom";
import { StyledNavBar } from "./components/styled-components/nav.styled";
import { Global } from "./components/styled-components/global.colors";
import styled from "styled-components";
import { Container } from "./components/styled-components/layout.styled";

const StyledContainer = styled.div`
    flex: 1;
    /* background-color: var(--clr-primary-deep-dark); */
    padding: 0rem 2rem;
    border-radius: 15px;
    display: flex;
    width: 100%;
    margin: 0 auto;
    max-height: 100vh;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: center; */
    scrollbar-width: thin;
    min-height: 90vh;
`;
StyledContainer.displayName = "StyledContainer";
const ThickerContainer = styled(StyledContainer)`
    padding: 0;

    width: 100%;
    width: max(80%, 900px);
    /* max-width:   */
    nav {
        position: absolute;
        top: -999px;
        overflow: visible;
        height: 0;
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
        <Container className="App" full={true} fullVertical={true}>
            <Global></Global>
            <Routes location={background || location}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="display" element={<LinkDisplay />}>
                        <Route path=":id" element={<LinkNameInput />}></Route>
                        <Route
                            path="internal/:id"
                            element={<ModalContainer isModal={true} />}
                        />
                        <Route
                            exact
                            path="internal/:id/inset"
                            element={<ModalContainer isModal={false} />}
                        />
                    </Route>
                    <Route path="create" element={<LinkNameInput />}>
                        <Route path="new" element={<LinkNameInput />}></Route>
                        {/* <Route path=":id" element={<LinkNameInput />}></Route> */}
                    </Route>
                </Route>
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path="create/:id"
                        element={<LinkNameInput modal={true} />}
                    />
                    <Route
                        path="display/internal/:id"
                        element={<ModalContainer />}
                    ></Route>
                </Routes>
            )}
        </Container>
    );
}

function Layout() {
    return (
        <Container full={true} fullVertical={true}>
            <nav>
                <StyledNavBar>
                    {/* <StyledNavLink underlineColor="#8e7eef">
                        <Link to="/">Dashboard</Link>
                    </StyledNavLink>
                    <StyledNavLink underlineColor="#8e7eef">
                        <Link to="/display">Link Display</Link>
                    </StyledNavLink> */}
                </StyledNavBar>
            </nav>

            <Outlet />
        </Container>
    );
}

export default App;
