const helpers = (function() {
    function cloneObject(object, isDeep=false){
        return isDeep ? JSON.parse(JSON.stringify(object)) : {...object}
    }
   
    return{
        cloneObject
    }
})()

export default helpers