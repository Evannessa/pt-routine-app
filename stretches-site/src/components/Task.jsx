import React from "react";
import styled from "styled-components";

const StyledTask = styled.div`
    display: flex;
    justify-content: center;
`;
export default function Task(props) {
    return (
        <StyledTask className="task">
            <input
                type="text"
                className="task__description blending-text-box"
                name="description"
                value={props.description}
                onChange={props.handleChange}
            />
        </StyledTask>
    );
}
