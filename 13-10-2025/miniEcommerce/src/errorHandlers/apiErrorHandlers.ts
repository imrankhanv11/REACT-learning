
export const handleApiError = (error: any) => {

    if (!error.response) {
        return { message: "Network error. Please check your connection." };
    }

    const { status, data } = error.response;

    switch (status) {

        case 400:
            return { message: data?.message || "Bad request" };

        case 401:
            return { message: "Unauthorized. Please login again." };

        case 403:
            return { message: "You don’t have permission." };

        case 404:
            return { message: data?.message || "Resource not found" };

        case 500:
            return { message: "Server error. Try again later." };

        default:
            return { message: data?.message || "Something went wrong" };
    }
};