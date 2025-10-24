import { token } from "../commons/enums/TokenStorage";
import { jwtDecode } from "jwt-decode";

interface IJwtDecode {
    nameid: string,
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: "User" | "Admin";
    role?: "User" | "Admin" | "SPAdmin";
}

const useDecodeToken = () => {

    const accesToken = localStorage.getItem(token.accessTokenLC);

    if(!accesToken){
        return null;
    }

    try{
        const decode = jwtDecode<IJwtDecode>(accesToken);

        return decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
    catch{
        return null;
    }
}

export default useDecodeToken;