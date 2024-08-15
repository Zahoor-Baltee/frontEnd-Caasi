import { Navigate } from "react-router-dom";
import AuthService from "../Services/AuthServices";

const Protected = ({ children }) => {
    if (!AuthService.isAuthenticated()) {
        return <Navigate to="/" />
    }
    return children
}
export default Protected