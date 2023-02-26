import { useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../App";

function IntersectionWatcher({ children, threshold }) {
    const childRefs = useRef([]);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const scrollAreaRef = useRef();
    // const targetRef = useRef();

    return <div ref={scrollAreaRef}>{children}</div>;
}

export default IntersectionWatcher;
