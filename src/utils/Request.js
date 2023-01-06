import Constants from "./Constants";

const HEADERS = {
    'Content-type': 'application/json',
};

const spreadQueries = (queryArray, queryString) => {
    for (let index = 1; index < queryArray.length; index++) {
        queryString += `${queryArray[index].key}=${queryArray[index].name}`
    }
    return queryString;
}

export const request = async ({ method = 'GET', path, body, id, queryArray, json }) => {
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

    if (json && response.status === Constants.RESPONSE.STATUS.OK) {
        const responseJson = await response.json();
        return responseJson;
    }
    return response;
}