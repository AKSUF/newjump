import axios from "axios";
export const addProductDetails = (ProductData, token) => {
    return axios.post(`/api/v1/producer/products`, ProductData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getAllProducts = (token) => {
    return axios.get("/api/v1/producer/products", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getPublicProducts = () => {
    return axios.get("/api/v1/producer/products");
};

export const getProductSingleDetails = (productId, token) => {
    return axios
        .get("/api/v1/producer/products/" + productId, {

            headers: {
                Authorization: "Bearer " + token,
            },
        });
};
export const getPublicProductSingleDetails = (productId) => {
    return axios
        .get("/api/v1/producer/products/" + productId);
};


export function deleteProducts(productId, token) {
    return axios.delete(`/api/v1/producer/products/${productId}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export const updateProducts = (ProductData, token) => {
    return axios.put(`/api/v1/producer/products`, ProductData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const loadAllProducts = (pageNumber, pageSize) => {
    return axios
        .get(
            `/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
        )
        .then((response) => response.data);
};


export async function uploadProductImage(ProductId, imagefile, token) {
    let formData = new FormData();
    formData.append("file", imagefile);
    return axios.post(
        `/api/v1/producer/products/${ProductId}/upload-product-image`,
        formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token,
            },
        }
    );
}


export const searchProduct = (search) => {
    return axios.get(
        `/api/v1//producer/products/search/${search}`
    );
};




// shopkeeper products
export const getAllStorePendingProducts = (token) => {
    return axios.get("/api/v1/producer/product-pending/store", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export async function uploadProductImages(productId, images, token) {
    if (!Array.isArray(images)) {
        throw new Error("Images must be an array");
    }
    const formData = new FormData();

    images.forEach((image) => {
        formData.append("images", image);
    });

    return axios.post(`/api/v1/producer/products/${productId}/images`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
        },
    });
}

export async function getProductImage(productId, filename) {
    const response = await axios.get(`/api/v1/producer/products/${productId}/images/${filename}`, {

        responseType: 'arraybuffer',
    });
    return response.data;
};