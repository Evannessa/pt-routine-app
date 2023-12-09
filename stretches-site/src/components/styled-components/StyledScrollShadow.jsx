import React from 'react';
import styled from 'styled-components';

const StyledShadowWrapper = styled.div`
    overflow: hidden;
    position: relative;
    .content{
        height: 100%;
        > div, ul{

            height: 100%;
        }
    }
    .shadow{
        position: absolute;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 10px;
        background: red;
        &--top{
            top: 0;
            /* background: -webkit-linear-gradient(270deg, rgba(0, 0, 0, 0.11), transparent); */
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.11), transparent);
            /* opacity: 0; */
        }
        &--bottom{
            bottom: 0;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.11), transparent);
        }
        &--left{
            height: 100%;
            width: 10px;
            left: 0;
            background: linear-gradient(to right, rgba(0, 0, 0, 0.11), transparent);
        }
        &--right{
            left: unset;
            height: 100%;
            width: 10px;
            right: 0;
            background: linear-gradient(to left, rgba(0, 0, 0, 0.11), transparent);
        }
    }


`

/**
 * Currently just provides a wrapper with a gradient shadow. Later will react to amount of scrollable content to show shadow opacity;
 * @param {Object} props - properties of the styled scroll shadow
 * @param {ReactComponentElement} - props.contentElement - the element holding the content that's being passed 
 * @returns A wrapper with a gradient shadow.
 */
const StyledScrollShadow = (props, {contentElement, verticalOnly=false}) => {
    return (
        <StyledShadowWrapper>
            <div className="shadow shadow--top"></div>
            <div className="shadow shadow--bottom"></div>
            {!verticalOnly && 
                <>
                <div className="shadow shadow--left"></div>
                <div className="shadow shadow--right"></div>
                </>            
            }
            <div class="content">{props.children}</div>
        </StyledShadowWrapper>
    );
}

export default StyledScrollShadow;
