import React from "react";
import InputLabelOverlay from "./InputLabelOverlay";
import TimerGallery from "./TimerGallery";

export default function TimerFactory(props) {
    const [formData, setFormData] = React.useState({
        type: "alternating",
        intervalNumber: 3,
    });
    function handleChange(event) {
        let { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    return (
        <div className="timer-factory ">
            <form action="">
                <InputLabelOverlay
                    label="Number of Timers"
                    type="number"
                    name="intervalNumber"
                    handleChange={handleChange}
                    value={formData.intervalNumber}
                />
                {/* <label htmlFor="intervalNumber">Number of Timers</label>
                <input
                    type="number"
                    name="intervalNumber"
                    id="intervalNumber"
                    onChange={handleChange}
                    value={formData.intervalNumber}
                /> */}

                <fieldset className="chip-group">
                    <input
                        type="radio"
                        name="type"
                        id="alternating"
                        value="alternating"
                        checked={formData.type === "alternating"}
                        onChange={handleChange}
                    />
                    <label htmlFor="alternating">Alternating</label>
                    <input
                        type="radio"
                        name="type"
                        id="no-breaks"
                        value="no-breaks"
                        checked={formData.type === "no-breaks"}
                        onChange={handleChange}
                    />
                    <label htmlFor="no-breaks">No Breaks</label>
                    <input
                        type="radio"
                        name="type"
                        id="custom"
                        value="custom"
                        checked={formData.type === "custom"}
                        onChange={handleChange}
                    />
                    <label htmlFor="custom">Custom</label>
                </fieldset>
            </form>

            {/** a timer */}
            <section className="factory__divider shapedividers_com-9543"></section>

            <TimerGallery number={formData.intervalNumber}></TimerGallery>
            <button className="factory__save-btn">Save</button>
        </div>
    );
}
