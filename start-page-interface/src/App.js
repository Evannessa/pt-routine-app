import LinkNameInput from "./components/LinkNameInput";
import LinkDisplay from "./components/LinkDisplay";
import Dashboard from "./components/Dashboard";
import ModalContainer from "./components/ModalContainer";
import "./App.css";
import styled from "styled-components";
import TagChips from "./components/TagChips";
import { useParams, useLocation, Route, Routes, Link, Outlet } from "react-router-dom";
import axios from "axios";
import IndividualLink from "./components/IndividualLink";

const StyledContainer = styled.div`
    flex: 1;
    background-color: #171529;
    padding: 2rem 3rem;
    border-radius: 15px;
    display: flex;
    width: 90%;
    margin: 0 auto;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    return (
        <StyledContainer className="App">
            <Routes location={background || location}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="display" element={<LinkDisplay />}>
                        <Route path=":id" element={<LinkNameInput />}></Route>
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
                </Routes>
            )}
        </StyledContainer>
    );
}

function Layout() {
    return (
        <ThickerContainer>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/display">Link Display</Link>
                    </li>
                </ul>
                <Outlet />
            </nav>
        </ThickerContainer>
    );
}

export default App;
