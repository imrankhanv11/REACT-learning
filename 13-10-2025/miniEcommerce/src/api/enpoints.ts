export const publicEndpoints = {
    FETCH_ALL_PRODUCTS : `/Product/GetAll/Products`,
    LOGIN : `/Authentication/Login`
};

export const privateEndpoints = {
    ADD_NEW_PRODUCT : `/Product/Admin/AddProduct`,
    UPDATE_PROUDCT_QUANTITY : (id: number) => `/Product/Admin/UpdateQuanity/${id}` ,
    FETCH_ALL_CARTS: `/Cart/GetCartItems`,
    ADD_NEW_CART_PRODUCT: `/Cart/AddtoCart`,
    REMOVE_CART : `/Cart/RemoveCartItem`
};