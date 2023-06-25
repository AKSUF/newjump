import axios from "axios";

export function addToCart(productId, token) {
    return axios.post(`/api/v1/user/addToCart/${productId}/product`, null, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export const getCartByUser = (token) => {
    return axios.get("/api/v1/user/carts", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export function deleteCart(cartId, token) {
    return axios.delete(`/api/v1/user/${cartId}/removeCart`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}
export const updateQty = (cartId, qty, token) => {
    return axios.put(`/api/v1/user/carts/${cartId}/${qty}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};