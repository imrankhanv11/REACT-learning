import { handleApiError } from "../errorHandlers/apiErrorHandlers";
import api from "./api"
import { publicEndpoints, privateEndpoints } from "./enpoints"
import { type productAddType } from "../types/productAddType";
// import { type removerCartType } from "../types/removeCartType";

// Get All Products
export const getAllProducts = async () => {
    try {
        const response = await api.get(publicEndpoints.FETCH_ALL_PRODUCTS);
        return response.data;
    }
    catch (err: any) {
        const error = handleApiError(err);
        throw new Error(error.message);
    }
}

// Add New Products
export const addNewProductsMethod = async (data: productAddType) => {
    try {
        const response = await api.post(privateEndpoints.ADD_NEW_PRODUCT, data);
        console.log(response.data);
        console.log(response.data.product);
        return response.data.product;
    }
    catch (error: any) {
        const handlerError = handleApiError(error);
        throw new Error(handlerError.message);
    }
}

// Remove Cart Item
