import type { metaLogRequest } from "../commons/interface/metalog";
import type { employeeOnBoardData } from "../commons/scemas/employeeOnBoardSchema";
import api from "./api"
import { apiErrorHandler } from "./apiErrorHandler";
import { endPoints } from "./endPoints";

export const addEmployee = async (item: employeeOnBoardData) => {
    try {
        const response = await api.post(endPoints.ONBOARDEMP, item);
        return response.data;
    }
    catch (err: any) {
        const error = apiErrorHandler(err);
        throw new Error(error.message);
    }
}

export const metaLog = async (item: metaLogRequest) => {
    try {
        const response = await api.post(endPoints.METALOG, item);
        return response.data;
    }
    catch (err: any) {
        const error = apiErrorHandler(err);
        throw new Error(error.message);
    }
}
