import { ContainedButton } from "../styled-components/Buttons.Styled";
import { StyledForm } from "../styled-components/input.styled";
import React from "react";

export function Form({ action, submitFunction, children, submitText }) {
    function handleSubmit(event) {
        event.preventDefault();
        submitFunction();
    }
    return (
        <StyledForm onSubmit={handleSubmit}>
            {children}
            <ContainedButton color="white" bgColor="cornflowerblue" type="submit">
                {submitText}
            </ContainedButton>
        </StyledForm>
    );
}

export default Form;
