import axios from "axios";

export const getAllRoles = () => {
    return axios.get("/api/v1/role/roles");
};



export const roleBasedLogin = (UserData) => {
    console.log("roleBasedLogin called with", UserData);
    return axios.post(`/auth/registration/${UserData.roleId}`, UserData);
};

export const getUserss = () => {
    return axios.get("/auth/users");
};
export const checkIfEmailIsUnique = (email) => {
    return axios.get(`/api/users/check-email?email=${email}`);
};
export const registerUserLocal = (roleBasedDetailsDto, token) => {
    return axios.post(`/api/v1/unauthorize/register`, roleBasedDetailsDto, {
        params: {
            token: token,
        },
    });
};
export async function UploadImagesRoles(roleBasedDetailsId, imagefile) {
    let formData = new FormData();
    formData.append("file", imagefile);
    return axios.post(
        `/api/v1/unauthorize/image/upload-profile-image/${roleBasedDetailsId}`,
        formData
    );
}

export const checkIfJumpStartIdsUnique = (jumpStartId) => {
    return axios.get(`/api/users/check-jumpStartId?jumpStartId=${jumpStartId}`);
};

export const getStoreName = () => {
    return axios.get("/api/v1/admin/stores");
};

export const getDetails = (userToken, token) => {
    return axios.get(`/api/v1/unauthorize/user`, {
        params: {
            token: token,
        },
    }, {

        headers: {
            Authorization: "Bearer " + userToken,
        },
    });
};

export const acceptUserRole = (userId, userToken, token) => {
    return axios.post(`/auth/${userId}/confirm?token=${token}`, {

        headers: {
            Authorization: "Bearer " + userToken,
        },
    });
};
export const getAllUsers = (token) => {
    return axios.get("/api/v1/unauthorize/users", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const rejectUserRole = (token, userToken) => {
    console.log(userToken);

    return axios.delete(`/api/v1/unauthorize/users?token=${token}`, {

        headers: {
            Authorization: "Bearer " + userToken,
        },

    });
};