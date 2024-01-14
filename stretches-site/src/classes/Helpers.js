const helpers = (function() {
    function cloneObject(object, isDeep=false){
        return isDeep ? JSON.parse(JSON.stringify(object)) : {...object}
    }
   function getItemWithProperty(array, propertyName, value) {
        return array.find(item => item[propertyName] == value)
    }
    function insertBetween(array, objectCreationCallback){
        let newArray = []
        for(let i = 0; i < array.length; i++){
            let item = array[i]
            newArray.push(item)
            let objectToInsert = objectCreationCallback(i)
            newArray.push(objectToInsert)
        }
        return newArray
    }
   
    return{
        cloneObject,
        getItemWithProperty,
        insertBetween
    }
})()

export default helpers