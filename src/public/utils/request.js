import CONSTANTS from "./constants.js";

const HEADERS = {
    'Content-type': 'application/json',
};

const errorOnRequest = (status, errorMessageJson) => {
    switch (status) {
        case CONSTANTS.RESPONSE.STATUS.NO_CONTENT:
            throw new Error(CONSTANTS.MESSAGE.NO_CONTENT, errorMessageJson);
        case CONSTANTS.RESPONSE.STATUS.ERROR:
            throw new Error(CONSTANTS.MESSAGE.ERROR, errorMessageJson);
        default:
            throw new Error(CONSTANTS.MESSAGE.ERROR, errorMessageJson);
    }
}

const spreadQueries = (queryArray, queryString) => {
    for (let index = 1; index < queryArray.length; index++) {
        queryString += `${queryArray[index].key}=${queryArray[index].name}`
    }
    return queryString;
}

export const request = async ({ method = CONSTANTS.METHODS.GET, path, body, id, queryArray, json }) => {
    try {
        const paramId = id ? `/${id}` : '';
        
        let queryString = '';
        if (queryArray) {
            queryString += `?${queryArray[0].key}=${queryArray[1].name}`;
            queryString += spreadQueries(queryArray, queryString);
        }
        
        const url = `${path}${paramId}${queryString}`;
        const response = await fetch(url, {
            headers: HEADERS,
            method,
            body: body ? JSON.stringify(body) : undefined
        });
        
        if (response.status !== CONSTANTS.RESPONSE.STATUS.OK) {
            const erro = await response.json();
            errorOnRequest(response.status, erro.msg);
        }
        if (json && response.status === CONSTANTS.RESPONSE.STATUS.OK) {
            const responseJson = await response.json();
            return responseJson;
        }
        return response;

    } catch (error) {
        console.error(error);
        swal(CONSTANTS.MESSAGE.ERROR_TITLE, error.message, 'error');
    }
}