import axios from "axios";

export const setShifts = (ShiftsData, token) => {
    return axios.post(`/api/v1/rider/setShifts`, ShiftsData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const showAllShifts = (token) => {
    return axios.get("/api/v1/rider/getAllShifts", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const userShifts = (token) => {
    return axios.get("/api/v1/rider/userShifts", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const editShifts = (ShiftsData, token) => {
    return axios.put(`/api/v1/rider/editShifts`, ShiftsData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const singleShift = (token, shifttoken) => {
    return axios.get(`/api/v1/rider/getShifts?shifttoken=${shifttoken}`, {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const deleteShift = (shifttoken, token) => {
    return axios.delete(`/api/v1/rider/deleteShift?shifttoken=${shifttoken}`, {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const riderDistrictbasedShift = (token) => {
    return axios.get("/api/v1/rider/shifts", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getAllShiftsbasedRiderId = (token) => {
    return axios.get("/api/v1/rider/shifts/rider", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};


export const takeShift = (shifttoken, token) => {
    console.log(token);
    return axios.put(`/api/v1/rider/shift/taken?shifttoken=${shifttoken}`, {}, {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const offerSwap = (shifttoken, token) => {
    console.log(token);
    return axios.put(`/api/v1/rider/shift/offer-swap?shifttoken=${shifttoken}`, {}, {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};