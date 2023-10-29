import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPreviewSection = styled.section`
    --padding-top: clamp(1rem, 1vw + 1rem, 2rem);
    display: ${(props) => (props.showModal ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    padding: clamp(1rem, 1vw + 1rem, 2rem);
    border-radius: 15px;
    background-color: #ffffff92;
    backdrop-filter: blur(5px);
    height: 80%;
    width: 90%;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    top: 50%;
    left: 50%;
    z-index: 200;
    transform: translate(-50%, -50%);
    text-align: center;
    gap: 0.5rem;
    label {
        color: currentColor;
    }
    h3 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: cornflowerblue;
        font-size: clamp(0.75rem, 1vw + 0.75rem, 1.25rem);
        margin-top: auto;
        margin-bottom: auto;
        + div {
            margin-bottom: auto;
        }
        span{
            display: inline-flex;
            &[data-variation="small"]{
                font-size: small;
            }
        }
    }
    @media ${device.tablet} {

        backdrop-filter: unset;
        background-color: transparent;
        position: relative;
        /* display: flex; */
        height: 100%;
        width: auto;
        box-shadow: unset;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 1fr 60%;
        align-items: center;
        justify-items: center;
        h3 {
            grid-row: 1/2;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.25rem;
            color: white;
            align-self:end;
            margin-bottom: 1rem;
            
            ${IconButton} {
                vertical-align: middle;
                max-width: 2rem;
            }
        }

        
        .task-description, ${StyledDropArea}{
            height: 80%;
            width: 80%;
            align-items: center;
	        /* box-shadow: rgba(33, 33, 33, 0.314) 0px 2px 0px 2px inset, rgba(255, 255, 255, 0.342) 0 -2px 0 -2px inset; */
            /* border-bottom: 3px solid rgba(255, 255, 255, 0.342);  */
            input[type="text"],textarea{
                border-radius: 20px;
                border-width: 1px;
                width: 100%;
            }
            textarea{
                background-color: transparent;
                color: white;
                /* border-style: dashed; */
            }
        }

        .task-description{
            color: white;
            border-radius: 20px;
            border-width: 1px;
        }
    }
  
`;


const PreviewTimerSection = ({showModal}) => {
    return (
        <StyledPreviewSection showModal={showModal}>
            
        </StyledPreviewSection>
    );
};



export default PreviewTimerSection;
