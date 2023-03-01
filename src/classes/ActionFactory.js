/**
 * Creates an object to create buttons w/ icons that perform a single action
 * @param {String} name - the name of the action
 * @param {String} iconName - the name of the material-icon we want to use
 * @param {*} functionRef - the referenced function that will be called when the action finishes
 * @param {String} description - a description of the action, to be used in tooltips
 * @returns an object containing all of the parameters wrapped into an object
 */
export default function ActionFactory(name, iconName, functionRef, description = "") {
    let actionObject = {
        name: name,
        icon: iconName,
        functionRef: functionRef,
        description: description,
    };
    return actionObject;
}
