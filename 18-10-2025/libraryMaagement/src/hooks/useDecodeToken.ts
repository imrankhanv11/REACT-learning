import { jwtDecode } from "jwt-decode"
import { tokens } from "../common/enums/tokens";

interface IjwtDecode {
    nameid: string,
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "Admin" | "User",
    token_type: string
}

export const useDecodeToken = () => {
    const accessToken = localStorage.getItem(tokens.accessToken);

    if (!accessToken) return null;

    try {
        const decode = jwtDecode<IjwtDecode>(accessToken);
        const role = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        return role;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}