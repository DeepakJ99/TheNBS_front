import { useContext, useDebugValue } from "react";
import AuthContext from "../Context/AuthContext";

const useAuth = () => {
    const {authenticated} = useContext(AuthContext);
    useDebugValue(authenticated, authenticated => 
                            authenticated?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext)
}


export default useAuth;