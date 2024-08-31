
import AppSetting from "./AppSetting";
import AuthService from "./AuthServices";
const baseURI = AppSetting.serverUrl
const token = AuthService.getToken()

const ExecuteGet = async (url) => {
    const token = AuthService.getToken()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    return await fetch(baseURI + url, {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
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
    const token = AuthService.getToken()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
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
    const token = AuthService.getToken()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
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
    ExecuteDelete,
}