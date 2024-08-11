
const userDate = "USER_DATA"
const token = "TOKEN"


const AuthService = {
    logOut() {

    },
    logIn(data, authtoken) {
        localStorage.setItem(userDate, JSON.stringify(data))
        localStorage.setItem(token, authtoken)
    },
    getUserData() {
        let data = localStorage.getItem(userDate)
        let parsedata = JSON.parse(data)
        return parsedata
    },
    getToken() {
        let data = localStorage.getItem(token)
        return data
    }
}
export default AuthService;