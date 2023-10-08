import React from 'react';
import styled from 'styled-components';

const StyledNumberContainer = styled.div`
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    aspect-ratio: 1/1;
    /* width: 2rem; */
    /* height: 2rem; */
    /* padding: 1em; */
    .prev, .next{
        display: none;
    }
    &:hover, &:focus, &:focus-within{
        border-radius: 999px;
        width: fit-content;

    .prev, .next{
        display: flex;
    }
    }
  border: 2px solid white;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  .number{
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  .prev{
    order: 1;
  }
  .number-box{
    order: 2;
  }
  .next{
    order: 3;
  }
`;

const InputNumber = ({value=0, setStateFunction}) => {
   
    function handleClick(event){
        let target = event.currentTarget
        if(target.id == "next"){

        }

    }


    return (
        <StyledNumberContainer>
            <button className="next material-icons" onClick={handleClick} id="next">
                {"next"}
            </button>
            <button className="prev material-icons" onClick={handleClick} id="prev">
                {"prev"}
            </button>
            <input className="number" type="number" value={value} />
            <div className="number-box">
                <span>{value}</span>
            </div>
            
        </StyledNumberContainer>
    );
};




export default InputNumber;
