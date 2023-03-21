import axios from "axios";

export const URLS = {
    urlBase: "http://localhost:3000/api",
    displayRoute: "/display",
    factoryRoute: "/factory",
    uploadsRoute: "/uploads"
}
export const urls = (() => {
    const urlBase = "http://localhost:3000/api"
    const displayRoute = "/display"
    const factoryRoute = "/factory"
    const uploadsRoute = "/uploads"

    const getUploadsUrl = () => {
        return urlBase + uploadsRoute
    }


    return {
        urlBase: urlBase,
        displayRoute: displayRoute,
        factoryRoute: factoryRoute,
        uploadsRoute: uploadsRoute,
        uploadsUrl: getUploadsUrl()
    }
})()

export const combineUrlFragments = (base, fragments = []) => {
    let url = base
    fragments.forEach((el) => {
        url += el
    })
    return url

}
export const requests = (function () {
    const { urlBase } = urls

    /**
     *
     * @description
     * axios request to our API
     * @param {Object} options
     * @param {String} options.method - the method
     * @param {String} options.baseURL - the base url if not default
     * @param {Array} options.pathsArray - array of paths to be joined together into sub-url
     * @param {functionReference} options.setStateCallback -  a callback, especially to set the state after the request is fulfilled
     * @param {Object} options.data - the optional data for the request if not default
     * @param {Object} options.propertyString - the dot-notation string
     * @param {Object} options.headers - the headers for the request if not default
     */
    async function axiosRequest(options) {
        if (!options.baseURL)
            options.baseURL = urlBase;


        //destructure the pathsArray and setStateCallback to be used elsewhere
        let { pathsArray, setStateCallback } = options;

        //join the paths in the array, then delete the array before passing the object on
        let url = "";
        if (!pathsArray || pathsArray.length === 0) {
            url = "/";
        } else {
            url = pathsArray.join("/");

        }
        delete options.pathsArray;
        options.url = url;
        console.log("Our options are now", options)

        //delete the setStateCallback from the object too
        delete options.setStateCallback;
        //TODO: Refactor this to use "transformRequest"

        axios(options)
            .then((response) => {
                if (response.status && response.status >= 200 && response.status < 300) {
                    if (setStateCallback) {
                        console.log("Response data is", response.data);
                        setStateCallback(response.data.document);
                    }
                } else {
                    console.log(response, "Response not good status");
                }
            })
            .catch(handleError);
    }

    //join together an array of components for a path
    function appendPath(pathsArray) {
        return pathsArray.join("/");
    }

    const handleError = (error) => {
        console.log("There was an error", error);
    };
    const makeSafe = (callback, errorHandler, pathArgs) => {
        return async () => {
            let fullPath = appendPath(pathArgs);
            await callback(fullPath).catch(errorHandler);
        };
    };


    //create
    const safeCreate = makeSafe(createObject, handleError);
    const safeCreateMultiple = makeSafe(createMultiple, handleError);

    //get
    const safeGetSingle = makeSafe(getObject, handleError);
    const safeGetAll = makeSafe(getAll, handleError);

    //delete
    const safeDelete = makeSafe(deleteObject, handleError);
    const safeDeleteMultiple = makeSafe(deleteMultiple, handleError);

    //update
    const safeUpdate = makeSafe(updateObject, handleError);

    /**
     * Get a specific object using id and such
     * @param {String} id - the id of the object we're getting
     * @param {String} urlBase - specific url we're sending get request to
     * @param {Object} params - the params, if there are any
     * @param {functionReference} setStateCallback - reference to setting state
     */
    async function getObject(id, setStateCallback, pathsArray) {
        let url = pathsArray.join("/");
        await axiosRequest("post", url).then((response) => {
            if (response.data !== null) {
                setStateCallback(response.data.document);
            }
        });
        // try {
        //     axios.get(fullPath).then((response) => {
        //         if (response.data !== null) {
        //             setStateCallback(response.data.link);
        //         }
        //     });
        // } catch (error) {
        //     console.log("There was an error");
        // }
    }

    /**
     *
     * @param {String} urlBase - string for where we're sending get request
     * @param {*} setStateCallback - callback for setting state where this was called
     */
    async function getAll(setStateCallback, pathName) {
        console.log("getting all objects");
        let fullPath = appendPath(urlBase, pathName);
        try {
            axios.get(`${pathName}`).then((result) => {
                setStateCallback(result.data.document);
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
    async function createObject(data, setStateCallback, pathName) {
        let responseData;
        try {
            await axios.post(`${urlBase}/${pathName}`, data).then((result) => {
                console.log("Result is", result);
                responseData = result.data.link;
            });
        } catch (error) {
            console.log(error);
        } finally {
            setStateCallback(responseData);
        }
    }

    /**
     * Update a specific object in a collection, by ID
     * @param {String} id - the id from the object we want to update, params
     * @param {*} updateData - the data we're updating with
     * @param {*} urlBase - the base url we're sending the patch request to
     */
    async function updateObject(
        id,
        updateData,
        setStateCallback,
        propertyName
    ) {
        try {
            await axios
                .patch(`${urlBase}/${id}`, updateData)
                .then((response) =>
                    setStateCallback(response.data[propertyName])
                );
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteObject(
        id,
        setStateCallback,
        currentState,
        propertyName
    ) {
        try {
            await axios.delete(`${urlBase}/${id}`).then((response) => {
                setStateCallback(
                    currentState.filter(
                        (link) => link._id !== response.data[propertyName]._id
                    )
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
    async function deleteMultiple(deleteData) { }

    function flattenData(format, outerData, propertyName) {
        let dataToPost = [];
        if (format === "array") {
        } else if (format === "object") {
            let objectArray = [];
            let data = JSON.parse(outerData)[propertyName];
            console.log(outerData);
            console.log(data);
            for (let name in data) {
                objectArray.push({
                    name: name,
                    url: data[name].url,
                    tags: data[name].tags,
                });
                dataToPost = objectArray;
            }
        }
        return dataToPost;
    }
    async function createMultiple(data, format) {
        console.log("Incoming data", data);
        let dataToPost = flattenData(format, data, "youtube");
        console.log(dataToPost);
        try {
            await axios.post(urlBase, dataToPost).then((response) => {
                console.log(response);
            });
        } catch (error) {
            console.log(error);
        }
    }
    /**
     *
     * @param {*} urlBase - the base url
     * @param {*} itemsToUpdate the list of items we want to update
     * @param {*} property - the property we want to update
     */
    async function updateMultiple(itemsToUpdate, property) { }

    function compileUpdateData(id, propertyPath, value, action, filter) {
        let newData = {
            id: id,
            propertyPath: propertyPath,
            update: value,
            action: action,
            filter: filter,
        };
        return newData;
    }

    return {
        // getObject,
        // getAll,
        // createObject,
        // createMultiple,
        // updateObject,
        // deleteObject,
        // deleteMultiple,
        compileUpdateData,
        // createBase,
        // displayBase,
        // urlBase,
        axiosRequest,
    };
})();
