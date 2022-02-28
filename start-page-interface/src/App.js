import LinkNameInput from "./components/LinkNameInput";
import "./App.css";
import styled from "styled-components";

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
            <LinkNameInput></LinkNameInput>
        </StyledContainer>
    );
}

export default App;
