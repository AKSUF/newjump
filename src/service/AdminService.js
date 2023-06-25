import axios from "axios";

export const getAllPendingProducts = (token) => {
    return axios.get("/api/v1/admin/pending-products", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const adminSendMsgToSeller = (message, productId, token) => {
    return axios.post(`/api/v1/admin/sendAdminMessage/${productId}`, message, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "text/plain",
        },
    });
};



export const approveProduct = (productId, token) => {
    return axios.put(`/api/v1/admin/approve-product/${productId}`, {}, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "text/plain",
        },
    });
};


export const rejectProducts = (productId, adminMessage, token) => {
    return axios.put(`/api/v1/admin/reject-product/${productId}`, { adminMessage }, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "text/plain",
        },
    });
};

export const totalUser = (token) => {
    return axios.get(`/api/v1/role/count/user`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const totalStores = (token) => {
    return axios.get(`/api/v1/admin/stores/count`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const totalRiders = (token) => {
    return axios.get(`/api/v1/role/count/rider`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const totalEmployees = (token) => {
    return axios.get(`/api/v1/role/count/emp`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};