import axios from "axios";

export const buyProductFronProducer = (ProductData, token) => {
    return axios.post(`/api/v1/buy/buy-product/${ProductData.producerId}`, ProductData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};


export async function UploadImagesToBuyProducts(BuyProductId, imagefile, token) {
    let formData = new FormData();
    formData.append("file", imagefile);
    return axios.post(
        `/api/v1/buy/buy-products/${BuyProductId}/upload-buy-product-image`,
        formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token,
            },
        }
    );
}

export const getAllShopKeeperRequest = (token) => {
    return axios.get("/api/v1/buy/shopkeeper-pending-product", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getAllProducerOrdersFromFhopkeepers = (token) => {
    return axios.get("/api/v1/buy/producer-pending-product", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const acceptOrederRequest = (requestId, message, price, token) => {
    return axios.put(`/api/v1/buy/accept-product/${requestId}`, { message, price }, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
    });
};

export const rejectOrderRequest = (requestId, token) => {
    return axios.put(`/api/v1/buy/not-available-product/${requestId}`, {}, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "text/plain",
        },
    });
};

export const getAllProducerOrdersAcceptedRequests = (token) => {
    return axios.get("/api/v1/buy/producer-request-accept-product", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const removeBuyProductDetails = (requestId, token) => {
    return axios.delete(`/api/v1/buy/remove/${requestId}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};


export const getBuyProductSingleDetails = (buyProductId, token) => {
    return axios
        .get("/api/v1/buy/buy-products/" + buyProductId, {

            headers: {
                Authorization: "Bearer " + token,
            },
        });
};
export const updaterequest = (butProductData, token) => {
    return axios.put(`/api/v1/buy/buy-products`, butProductData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}