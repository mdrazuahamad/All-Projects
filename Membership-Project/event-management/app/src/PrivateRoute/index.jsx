import { Navigate } from "react-router-dom";

const PrivateRoute = ({child}) => {
    const jwt = true;
    console.log("jwt", jwt)
    return jwt ? child : <Navigate to="/login" />;
}

export default PrivateRoute;
