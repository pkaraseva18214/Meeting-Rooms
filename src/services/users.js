import {ME_URL, USER_BY_ID_URL, USERS_URL} from "../constants/mainConstants";
import request from "../helper/requests";

export async function getUserByToken() {
    return request
        .get(`${ME_URL}`);
}

export async function getUserById(id) {
    const userURL = USER_BY_ID_URL.replace("{id}", id);
    return request
        .get(`${userURL}`);
}

export async function editUserData(userData) {
    return request
        .patch(`${USERS_URL}`, userData);
}
