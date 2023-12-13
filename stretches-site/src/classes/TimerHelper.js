import { nanoid } from "nanoid";

const TimerHelpers = (() => {
    function rollOver(currentValue) { }

    function getSetId(timerSet) {
        let id = nanoid()
        if (typeof timerSet._id === "string") {
            id = timerSet._id
        } else if (typeof timerSet._id === "object") {
            id = timerSet._id.hasOwnProperty("$oid") ? timerSet._id["$oid"] : nanoid()
        }else{
            console.error("Appropriate id not found for ", timerSet)
        }
        return id
    }
    function abbreviateId(id){
        return id.splice(-2)
    }
 
    return {
        getSetId,
    }

})();

export default TimerHelpers

