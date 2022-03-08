const { default: styled } = require("styled-components");

export const StyledHeader = styled.header`
    grid-area: hd;
    position: sticky;
    background-color: #242141;
    padding: 2rem;
    /* margin-left: -6rem; */
    /* margin-right: -6rem; */
`;
export const StyledMain = styled.main`
    grid-area: main;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 25% 15% repeat(3, 1fr);
    grid-auto-rows: auto;
    width: 100%;
    grid-template-areas:
        "hd hd hd   hd   hd"
        "sd sd main main main"
        "ft ft ft   ft   ft";
    overflow: hidden;
`;

export const StyledOuterMain = styled(StyledMain)`
    display: grid;
    grid-template-columns: 100%;
    grid-template-areas:
        "hd"
        "main";
    overflow-x: visible;
    overflow-y: hidden;
`;

export const StyledContent = styled.section`
    grid-area: main;
    > {
        position: fixed;
    }
`;
export const StyledSidebar = styled.section`
    grid-area: sd;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: scroll;
    scrollbar-width: thin;
`;
