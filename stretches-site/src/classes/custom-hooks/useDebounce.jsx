// https://www.developerway.com/posts/debouncing-in-react
import React, { useRef, useMemo, useCallback } from "react"
import debounce from "lodash.debounce";
import throttle from "lodash.throttle"

export const useDebounce = (callback) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
        const func = () => {
            ref.current?.();
        };

        return debounce(func, 1000);
    }, []);

    return debouncedCallback;
};

export const useThrottle = (callback) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedThrottle = useMemo(() => {
        const func = () => {
            ref.current?.();
        };

        return throttle(func, 1000);
    }, []);

    return debouncedThrottle;




}