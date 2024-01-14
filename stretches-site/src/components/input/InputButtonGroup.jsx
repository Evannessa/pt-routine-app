import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledInputWrapper } from './Input';

export const StyledInputButtonGroup = styled.div`
    width: fit-content;
    position: relative;
    background-color: white;
    border-radius: 5px;
    display: flex;
    padding: 0.5rem;
    margin-inline: auto;
    filter: drop-shadow(0 0 0.75rem crimson);
    ${StyledInputWrapper}{
        border-color: orange;

    }
    &::before{
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent white transparent;
    }

`

/**
 * 
 * @returns ReactComponent
 */
const InputButtonGroup = (props) => {
    return (
        <StyledInputButtonGroup>
           {props.children} 
        </StyledInputButtonGroup>
    );
};


InputButtonGroup.propTypes = {

};


export default InputButtonGroup;
