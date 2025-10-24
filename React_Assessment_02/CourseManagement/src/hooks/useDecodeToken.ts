import { jwtDecode } from "jwt-decode";
import { Token } from "../common/enum/token";

interface IJwtDecode {
    nameid: string,
    isAdmin: string;
}

const useDecodeToken = () => {

    const accesToken = localStorage.getItem(Token.accessToken);

    if (!accesToken) {
        return null;
    }

    try {
        const decode = jwtDecode<IJwtDecode>(accesToken);
        return decode.isAdmin;
    }
    catch {
        return null;
    }
}

export default useDecodeToken;