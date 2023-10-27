/**
 * Creates an object to create buttons w/ icons that perform a single action
 * @param {String} name - the name of the action
 * @param {String} iconName - the name of the material-icon we want to use
 * @param {*} functionRef - the referenced function that will be called when the action finishes
 * @param {String} description - a description of the action, to be used in tooltips
 * @param {Object} options - extra options for the button, like classes and such
 * @param {boolean} options.toggle - whether or not the option is toggled, for different styles
 * @returns an object containing all of the parameters wrapped into an object
 */
export default function ActionFactory(name, iconName, functionRef, description = "", options={}) {
    let actionObject = {
        name: name,
        icon: iconName,
        functionRef: functionRef,
        description: description,
        options: options
    };
    return actionObject;
}
