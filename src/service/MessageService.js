import axios from "axios"


export async function sendMessages(message, productId, token) {
    return axios.post(`/api/v1/user/product/${productId}/comments`, message, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}



export function deleteComment(commentId, token) {
    return axios.delete(`/api/v1/user/comments/${commentId}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}