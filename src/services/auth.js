import request from "../helper/requests";
import {LOGIN_URL, REGISTER_URL} from "../constants/mainConstants";

export function login({username, password}) {
    return request.post(`${LOGIN_URL}`, {username, password});
}

export function register({username, password, email}) {
    return request
        .post(`${REGISTER_URL}`, {username, password, email});

}