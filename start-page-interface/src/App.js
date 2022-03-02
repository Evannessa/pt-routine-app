import LinkNameInput from "./components/LinkNameInput";
import LinkDisplay from "./components/LinkDisplay";
import "./App.css";
import styled from "styled-components";
import { Routes, Route, Outlet, Link } from "react-router-dom";

const StyledContainer = styled.div`
    flex: 1;
    background-color: #212121;
    padding: 2rem 3rem;
    border-radius: 15px;
    display: flex;
    width: 60%;
    margin: 0 auto;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function App() {
    return (
        <StyledContainer className="App">
            <Routes>
                <Route path="links/">
                    <Route path="" element={<LinkDisplay />}></Route>
                    <Route path="new" element={<LinkNameInput />}></Route>
                    <Route path=":id" element={<LinkNameInput />}></Route>
                </Route>
            </Routes>
        </StyledContainer>
    );
}

export default App;
