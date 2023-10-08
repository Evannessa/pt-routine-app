import React, { useState, useEffect, useRef } from "react";
import Portal from "../components/Portal";
import debounce from "lodash.debounce";
import styled from "styled-components";
import useWindowSize from "../classes/custom-hooks/useWindowSize";

export function TooltipWrapper({ children, toggleAction = "hover", _actionElement, startVisible }) {
    const [hoverTargets, setHoverTargets] = useState({ parent: false, child: false });
    const [isOn, setIsOn] = useState(startVisible ? true : false);
    const [coords, setCoords] = useState({});

    const ref = useRef(null);
    /**
     *
     * @param {Boolean} bool - toggle whether it's hovered or not
     */
    function _setIsOn(bool) {
        setIsOn(bool);
    }
    function _setHoverTargets(bool, which) {
        setHoverTargets((prev) => {
            return {
                ...prev,
                [which]: bool,
            };
        });
    }
    useEffect(() => {
        if (toggleAction === "hover") {
            const hovering = Object.values(hoverTargets).some((val) => val === true);
            if (hovering) {
                updateTooltipCoords();
                setIsOn(true);
            } else {
                setTimeout(() => {
                    setIsOn(false);
                }, 100);
            }
        }
    }, [hoverTargets, toggleAction]);

    const listeners = {
        ...(toggleAction === "click" && { onClick: () => _setIsOn(!isOn) }),
        ...(toggleAction === "hover" && {
            onMouseEnter: () => _setHoverTargets(true, "parent"),
            onMouseLeave: () => _setHoverTargets(false, "parent"),
        }),
    };
    useEffect(() => {
        const rect = ref.current.getBoundingClientRect();
        // console.log(rect.x, rect.y);
        setCoords({
            left: rect.x + rect.width / 2,
            top: rect.y + window.scrollY + rect.height,
        });
    }, []);
    function updateTooltipCoords() {
        const rect = ref.current.getBoundingClientRect();

        setCoords({
            left: rect.x + rect.width / 2,
            top: rect.y + window.scrollY + rect.height,
        });
    }

    const anchorElement = () => {
        return React.cloneElement(children[0], { ...listeners, ref: ref });
    };

    const otherElements = children.filter((child, index) => index !== 0);

    return (
        <>
            {anchorElement()}
            <Portal>
                {isOn && (
                    <TooltipPopover
                        coords={coords}
                        active={isOn}
                        setHoverTargets={_setHoverTargets}
                        updateTooltipCoords={updateTooltipCoords}
                    >
                        {otherElements}
                    </TooltipPopover>
                )}
            </Portal>
        </>
    );
}
const StyledTooltipPopover = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: #ffffff74;
    backdrop-filter: blur(12px);
    border: 1px solid;
    pointer-events: auto;
    overflow: hidden;

    max-width: 10rem;
    border-color: ${(props) => props.theme.color1};
    p {
        background-color: #ffffff74;
        text-align: center;
        color: ${(props) => props.theme.color1};
    }
    img {
        width: 100%;
        height: auto;
    }
`;
function TooltipPopover({ coords, updateTooltipCoords, children, setHoverTargets }) {
    // console.log(coords);
    const updateCoords = debounce(() => {
        updateTooltipCoords();
        console.log("Delay");
    }, 100);
    const listeners = {
        onMouseEnter: () => {
            setHoverTargets(true, "child");
        },
        onMouseLeave: () => setHoverTargets(false, "child"),
    };
    const { onMouseEnter, onMouseLeave, onClick } = listeners;

    // useEffect(() => {
    //     console.log(coords);
    // }, [coords]);

    useEffect(() => {
        // window.addEventListener("resize", updateCoords)
        window.addEventListener("resize", updateCoords);
        // updateCoords();

        return () => window.removeEventListener("resize", updateCoords);
    }, []);

    const style = {
        top: coords.top,
        left: coords.left,
        position: "absolute",
        zIndex: 1000,
        transform: "translateX(-50%)",
    };
    // console.log(style);
    return (
        <StyledTooltipPopover style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
            {children}
        </StyledTooltipPopover>
    );
}

export default TooltipPopover;
