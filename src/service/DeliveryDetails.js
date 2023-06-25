import axios from "axios";


export const AddDelieryDetails = (DeliverDetails, token) => {
    return axios.post(`/api/v1/user/products/delivery_address`, DeliverDetails, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const updateDelieryDetails = (DeliverDetails, token) => {
    return axios.put(`/api/v1/user/products/delivery_address`, DeliverDetails, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getDetailsByUser = (token) => {
    return axios.get(`/api/v1/user/products/delivery_address`, {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export function getParticularDeliverDetails(deliverDetailsId, token) {
    return axios.get("/api/v1/user/products/delivery_address/" + deliverDetailsId, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export function deleteDeliverDetails(deliverDetailsId, token) {
    return axios.delete("/api/v1/user/products/delivery_address/" + deliverDetailsId, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}