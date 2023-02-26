import React from "react";

export default function SpeedDialMenu(props) {
    const [open, setOpen] = React.useState(false);
    function createActionButtons() {
        let items = [];
        let delay = 250;
        items = props.actions.map((action, index) => {
            delay -= 50;
            return (
                <div
                    key={index}
                    className="speed-dial__item"
                    style={{ transitionDelay: delay + "ms" }}
                    title={action.name}
                >
                    <button
                        className="speed-dial__btn"
                        onClick={() => action.functionRef()}
                    >
                        {action.icon}
                    </button>
                </div>
            );
        });

        return items;
    }
    let speedDialElements = createActionButtons();
    return (
        <div className="speed-dial">
            <button
                className={`speed-dial__btn speed-dial__btn--root ${open ? "open" : ""}`}
                onClick={() => {
                    setOpen((prevState) => !prevState);
                }}
            >
                <span className="material-icons">add</span>
            </button>
            {open && <div className="speed-dial__actions">{speedDialElements}</div>}
        </div>
    );
}
