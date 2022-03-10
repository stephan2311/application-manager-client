import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

function IsPrivate({ children }) {

    const { isLoggedIn, isLoading } = useContext(AuthContext);

    if (isLoading) return <Spinner></Spinner>;

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
}

export default IsPrivate;
