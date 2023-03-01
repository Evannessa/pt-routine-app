import React from "react";
import { createPortal } from "react-dom";
//from https://dev.to/link2twenty/react-using-portals-to-make-a-modal-2kdf

export default function Portal({ children, parent, className }) {
    const mount = document.getElementById("portal-root");
    const el = React.useMemo(() => document.createElement("div"), []);
    // On mount function
    React.useEffect(() => {
        // work out target in the DOM based on parent prop
        mount.appendChild(el);
        return () => mount.removeChild(el);
    }, [el, parent, className, mount]);
    // return the createPortal function
    return createPortal(children, el);
}
