const helpers = (function() {
    function cloneObject(object, isDeep=false){
        return isDeep ? JSON.parse(JSON.stringify(object)) : {...object}
    }
   function getItemWithProperty(array, propertyName, value) {
        return array.find(item => item[propertyName] == value)
    }
   
    return{
        cloneObject,
        getItemWithProperty
    }
})()

export default helpers