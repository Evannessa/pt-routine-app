import styled, { css } from "styled-components";
export const StyledModal = styled.div`
    position: absolute;
    overflow: visible;
    padding: 2rem;
    line-height: 1.5;
    min-width: 200px;
    /* width: 50%; */
    color: rgb(39, 39, 39);
    font-size: var(--text-sm, 1rem);
    z-index: 20;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.11) 0px 15px 12px;
`;
