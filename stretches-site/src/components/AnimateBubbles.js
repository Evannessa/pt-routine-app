import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import usePrevious from "../hooks/usePrevious";
import calculateBoundingBoxes from "../helpers/calculateBoundingBoxes";
//https://itnext.io/animating-list-reordering-with-react-hooks-aca5e7eeafba
export const AnimateBubbles = ({ children }, arrays) => {
    const [boundingBox, setBoundingBox] = useState({});
    const [prevBoundingBox, setPrevBoundingBox] = useState({});
    const prevChildren = usePrevious(children);
    const previousRef = useRef();

    //reset for when a new child is added or removed?
    function resetPreviousRef() {
        previousRef.current = null;
        setBoundingBox({});
        setPrevBoundingBox({});
    }
    useEffect(() => {
        if (previousRef.current) {
            // resetPreviousRef();
        }
    }, [children]);

    useLayoutEffect(() => {
        const newBoundingBox = calculateBoundingBoxes(children);
        setBoundingBox(newBoundingBox);
    }, [children]);

    useLayoutEffect(() => {
        const prevBoundingBox = calculateBoundingBoxes(prevChildren);
        setPrevBoundingBox(prevBoundingBox);
    }, [prevChildren]);

    function updatePreviousRef() {
        previousRef.current = Object.fromEntries(
            children.map((child) => [
                child.key,
                child.ref.current.getBoundingClientRect(),
            ])
        );
    }
    //Animations = First, Last, Inverted (value) [difference between first and last, then apply transforms and opacity changes to reverse or INVERT them], Play
    useEffect(() => {
        const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;
        if (!previousRef.current) {
            updatePreviousRef();
        }

        if (hasPrevBoundingBox) {
            React.Children.forEach(children, (child) => {
                console.log(child)
                let key = child.key.slice(-2);

                const domNode = child.ref.current;

                const changeInX =
                    previousRef.current[child.key].left -
                    boundingBox[child.key].left; //the difference

                if (changeInX) {
                    requestAnimationFrame(() => {
                        //before the DOM paints, invert child to old position
                        domNode.style.transform = `translateX(${changeInX}px)`;
                        domNode.style.transition = "transform 0s";

                        requestAnimationFrame(() => {
                            //after previous fame, remove the transition to play the animation
                            domNode.style.transform = "";
                            domNode.style.transition = "transform 500ms";
                            previousRef.current = null; //reset previous
                        });

                        //translate them to the "inverse" position
                        //then reverse
                    });
                }
            });
        }
    }, [boundingBox, prevBoundingBox, children]);

    return children;
};

// const ForwardedAnimateBubbles = forwardRef(AnimateBubbles);

// export default ForwardedAnimateBubbles;
