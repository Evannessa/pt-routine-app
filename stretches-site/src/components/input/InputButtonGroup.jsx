import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledInputWrapper } from './Input';

const StyledInputButtonGroup = styled.div`
    background-color: white;
    border-radius: 5px;
    display: flex;
    padding: 0.5rem;
    ${StyledInputWrapper}{
        border-color: orange;

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
