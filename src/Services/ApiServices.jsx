
import AppSetting from "./AppSetting";
const baseURI = AppSetting.serverUrl

const ExecuteGet = async (url) => {
    return await fetch(baseURI + url, {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => {
            return JSON.parse(result);
        })
        .catch(error => {
            return error;
        });
};

const ExecutePost = async (url, data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    return await fetch(baseURI + url, {
        method: 'POST',
        redirect: 'follow',
        headers: myHeaders,
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(result => {
            return JSON.parse(result);
        })
        .catch(error => {
            return error;
        });
};
const ExecutePatch = async (url, data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    return await fetch(baseURI + url, {
        method: 'PATCH',
        redirect: 'follow',
        headers: myHeaders,
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(result => {
            return JSON.parse(result);
        })
        .catch(error => {
            return error;
        });
}
const ExecuteDelete = async (url) => {
    try {
        const response = await fetch(baseURI + url, {
            method: 'DELETE',
            redirect: 'follow',
        });
        return await response.json();
    } catch (error) {
        console.error("Error during DELETE request:", error);
        throw error;
    }
};
export {
    ExecutePost,
    ExecuteGet,
    ExecutePatch,
    ExecuteDelete
}