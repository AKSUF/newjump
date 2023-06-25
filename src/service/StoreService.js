import axios from "axios";

export const addStoreDetails = (StoreData, token) => {
    return axios.post(`/api/v1/admin/store`, StoreData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export async function uploadStoreImage(storeId, imagefile, token) {
    let formData = new FormData();
    formData.append("file", imagefile);
    return axios.post(
        `/api/v1/admin/store/${storeId}/upload-store-image`,
        formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token,
            },
        }
    );
}


export const showAllStore = (token) => {
    return axios.get("/api/v1/admin/store", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getSingleStoreDetails = (srore_id, token) => {
    return axios
        .get("/api/v1/admin/store/" + srore_id, {

            headers: {
                Authorization: "Bearer " + token,
            },
        });
};

export function deleteStore(storeId, token) {
    return axios.delete(`/api/v1/admin/store/${storeId}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export const updateStores = (StoreData, token) => {
    return axios.put(`/api/v1/admin/store`, StoreData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getStoreSingleDetails = (store_id, token) => {
    return axios
        .get("/api/v1/admin/store/" + store_id, {

            headers: {
                Authorization: "Bearer " + token,
            },
        });
};
export const getAllStoreAccount = (store_id, token) => {
    return axios
        .get("/api/v1/admin/" + store_id + "/accounts", {

            headers: {
                Authorization: "Bearer " + token,
            },
        });
};
export const getStoreProducts = (token) => {
    return axios
        .get(`/api/v1/producer/stores/products`, {

            headers: {
                Authorization: "Bearer " + token,
            },
        });
};