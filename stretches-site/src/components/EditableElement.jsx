import React from "react";

export default function EditableElement(props) {
    const { onChange } = props;
    const element = React.useRef();
    let elements = React.Children.toArray(props.children);
    if (elements.length > 1) {
        throw Error("Can't have multiple children");
    }

    function onMouseUp() {
        const value = element.current?.value || element.current?.innerText;
        onChange(value);
    }
    React.useEffect(() => {
        const value = element.current?.value || element.current?.innerText;
        onChange(value);
    }, []);
    elements = React.cloneElement(elements[0], {
        contentEditable: true,
        suppressContentEditableWarning: true,
        ref: element,
        onKeyUp: onMouseUp,
    });
    return elements;
}
