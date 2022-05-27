import {BASE_URL, LOGIN_URL, REGISTER_URL} from "../constants/mainConstants";
import axios from "axios";

const request = axios.create({
    baseURL: BASE_URL,
});

request.interceptors.request.use(setJWTHeader);
request.interceptors.response.use(setJWTLocalStorage);
request.interceptors.response.use(responseMapper, errorHandler);

function responseMapper(response) {
    return Promise.resolve(response);
}

function errorHandler(data) {
    const {response} = data;
    const newError = {};

    newError.statusCode = response.status;
    newError.statusMessage = response.statusText;
    newError.errorCode = parseJSON(response.data);

    return Promise.reject(newError);
}

function parseJSON(data) {
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
}

function setJWTHeader(config) {
    config.headers.common.Authorization
        = 'Bearer ' + localStorage.getItem('token');

    return config;
}

function setJWTLocalStorage(response) {
    switch (true) {
        case new RegExp(`${REGISTER_URL}$`)
            .test(response.config.url):
        case new RegExp(`${LOGIN_URL}$`)
            .test(response.config.url):

            const {token} = response.data.data;

            if (token) {
                localStorage.setItem('token', token);
            }

            return response;
        default:
            return response;
    }
}

export function getToken() {
    return localStorage.getItem('token');
}

export default  request;


