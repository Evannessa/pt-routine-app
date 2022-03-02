import axios from "axios";

export function requests() {
    /**
     * Get a specific object using id and such
     * @param {String} id - the id of the object we're getting
     * @param {String} urlBase - specific url we're sending get request to
     * @param {Object} params - the params, if there are any
     * @param {functionReference} setStateCallback - reference to setting state
     	 */
    async function getObject(id, urlBase, params, setStateCallback) {
        if (params && params?.id !== "new") {
            try {
                axios.get(`${urlBase}/${id}`).then((response) => {
                    if (response.data !== null) {
                        setStateCallback(response.data.link);
                    }
                });
            } catch (error) {
                console.log("There was an error");
            }
        }
    }

    /**
     *
     * @param {String} urlBase - string for where we're sending get request
     * @param {*} setStateCallback - callback for setting state where this was called
     	 */
    async function getAll(urlBase, setStateCallback) {
        try {
            axios.get(`${urlBase}/tags`).then((result) => {
                setStateCallback(result.data.tags);
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Create a specific object in a collection
     * @param {String} id - the id from the object we want to update, params
     * @param {*} data - the data we're creating the object with
     * @param {*} urlBase - the base url we're sending the patch request to
     * @param {Object} - location - the location in the url whose pathname we'll use
     	 */
    async function createObject(urlBase, data, location) {
        if (location.pathname.includes("new")) {
            return;
        }
        try {
            await axios.post(`${urlBase}/new`, data).then((result) => {
                console.log("Result is", result);
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Update a specific object in a collection, by ID
     * @param {String} id - the id from the object we want to update, params
     * @param {*} updateData - the data we're updating with
     * @param {*} urlBase - the base url we're sending the patch request to
     	 */
    async function updateObject(id, updateData, urlBase, setStateCallback, propertyName) {
        try {
            await axios
                .patch(`${urlBase}/${id}`, updateData)
                .then((response) => setStateCallback(response.data[propertyName]));
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteObject(id, urlBase, setStateCallback, currentState) {
        try {
            await axios.delete(`${urlBase}/${id}`).then((response) => {
                setStateCallback(
                    currentState.filter((link) => link._id !== response.data.link._id)
                );
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Delete multiple docs in a collection
     * @param {*} urlBase - url base we'll send the delete request to
     * @param {Object} deleteData - the data used to determine what should be deleted -- empty object will delete all
     	 */
    async function deleteMultiple(urlBase, deleteData) {}

    return {
        getObject,
        getAll,
        createObject,
        updateObject,
        deleteObject,
        deleteAllInCollection: deleteMultiple,
    };
}