import {STATUS} from "../../constants/mainConstants";
import {createSlice} from "@reduxjs/toolkit";
import {getToken} from "../../helper/requests";

const authenticationSlice = createSlice({
    name: "@authentication",
    initialState : {
        username: null,
        isLoggedIn: !!getToken(),
        status: STATUS.NOT_REQUESTED,
        error: null,
    },
    reducers: {
        loginRequest(state) {
            state.status = STATUS.LOADING;
            state.error = null;
        },
        loginSuccess(state, payload) {
            state.username = payload.payload.data.data.user.username;
            state.status = STATUS.SUCCESS;
            state.error = null;
            state.isLoggedIn = true;
            state.token = payload.payload.data.data.token;
        },
        loginError(state, payload) {
            state.status = STATUS.ERROR;
            state.error = payload;
            state.isLoggedIn = false;
        },
        logout(state) {
          state.status = STATUS.NOT_REQUESTED;
          state.error = null;
          state.isLoggedIn = false;
        },
        registerRequest(state) {
            state.status = STATUS.LOADING;
            state.error = null;
            state.isLoggedIn = false;
        },
        registerSuccess(state) {
            state.status = STATUS.SUCCESS;
            state.error = null;
            state.isLoggedIn = true;
        },
        registerError(state, payload) {
            state.status = STATUS.ERROR;
            state.error = payload;
            state.isLoggedIn = false;
        },
    },
});

export default authenticationSlice.reducer;

export const {
    loginRequest,
    loginSuccess,
    loginError,
    registerRequest,
    registerSuccess,
    registerError,
    logout
} = authenticationSlice.actions;