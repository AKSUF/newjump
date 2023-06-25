import axios from "axios";

export const cashOnDelivery = (productId, token, deliverDetailsId, quantity) => {
    return axios.post(
        `/api/v1/user/products/${deliverDetailsId}/${productId}/${quantity}`, null,

        {
            headers: {
                Authorization: "Bearer " + token,

            },
        }
    );
};

export const payWithStripe = (DeliveryData, productId, token, deliverDetailsId, quantity) => {
    return axios.post(
        `/api/v1/user/products/stripe/${deliverDetailsId}/${productId}/${quantity}`, DeliveryData,

        {
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );
};

export const myOrders = (token) => {
    return axios.get(`/api/v1/user/products/orders`, {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const deliveryStatusChangeByProducer = (buyProductId, token) => {
    return axios.put("/api/v1/buy/producer/delivery-status/" + buyProductId, null, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
};

export const getSingleDelivery = (delivery_id, token) => {
    return axios.get(`/api/v1/user/orders/${delivery_id}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const RiderDistrictBasedOrderDelivery = (token) => {
    return axios.get(`/api/v1/rider/rider-orders`, {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const changeDeliStatus = (deliveryId, token, status) => {
    return axios.put("/api/v1/rider/products/" + deliveryId, null, {
        headers: {
            Authorization: "Bearer " + token,
        },
        params: {
            status: status,
        },
    });
};

export const shippingchangeDeliStatus = (deliveryId, token, status) => {
    return axios.put("/api/v1/rider/products/courier/" + deliveryId, null, {
        headers: {
            Authorization: "Bearer " + token,
        },
        params: {
            status: status,
        },
    });
};

export const allRiderDeliveryDetails = (token) => {
    return axios.get(`/api/v1/rider/rider-emp`, {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const allRiders = (token) => {
    return axios.get(`/api/v1/role/riders`, {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const deliveryByCouier = (token) => {
    return axios.get(`/api/v1/rider/courier`, {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const sendRequestToRiderForDeliver = (deliveryId, rid, token) => {
    return axios.put(`/api/v1/rider/${deliveryId}/request/${rid}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};


export const getSingleDeliveryeDetails = (deliveryId, token) => {
    return axios
        .get("/api/v1/user/delivery/" + deliveryId, {

            headers: {
                Authorization: "Bearer " + token,
            },
        });
};


export const getOrderProducts = (token) => {
    return axios
        .get(`/api/v1/user/orders/products`, {

            headers: {
                Authorization: "Bearer " + token,
            },
        });
};