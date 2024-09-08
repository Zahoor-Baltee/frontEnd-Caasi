
const userDate = "USER_DATA"
const token = "TOKEN"


const AuthService = {
    isAuthenticated() {
        return localStorage.getItem(token) !== null
    },
    logOut() {
        localStorage.removeItem(token);
        window.location.href = "/"
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
    },
    getUserName() {
        let firstName = this.getUserData().name
        return firstName
    },
    getUserid() {
        let firstName = this.getUserData()._id
        return firstName
    }
}
export default AuthService;