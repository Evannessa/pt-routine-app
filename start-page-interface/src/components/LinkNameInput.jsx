import React from "react";

function LinkNameInput(props) {
    return (
        <div>
            <label htmlFor="linkName">Link Name</label>
            <input type="text" name="linkName" id="linkName" />
            <label htmlFor="url">URL</label>
            <input type="text" name="url" id="url" />
        </div>
    );
}

export default LinkNameInput;
