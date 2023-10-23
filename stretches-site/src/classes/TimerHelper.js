import { nanoid } from "nanoid";

const TimerHelpers = (() => {
    function rollOver(currentValue) { }

    function getSetId(timerSet) {
        let id = nanoid()
        if (typeof timerSet._id === "string") {
            id = timerSet._id
        } else if (typeof timerSet._id === "object") {
            id = timerSet._id.hasOwnProperty("$oid") ? timerSet._id["$oid"] : nanoid()
        }
        return id
    }
 
    return {
        getSetId,
    }

})();

export default TimerHelpers

