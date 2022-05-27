import {STATUS} from "../../constants/mainConstants";
import {createSlice} from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "@users",
    initialState: {
        user: null,
        status: STATUS.NOT_REQUESTED,
        error: null,
    },
    reducers: {
        getUserDataByTokenRequest(state) {
            state.status = STATUS.LOADING;
            state.error = null;
        },
        getUserDataByTokenSuccess(state, payload) {
            state.user = payload.payload.data;
            state.status = STATUS.SUCCESS;
            state.error = null;
        },
        getUserDataByTokenError(state, payload) {
            state.status = STATUS.ERROR;
            state.error = payload;
        },
        editUserDataRequest(state) {
            state.status = STATUS.LOADING;
            state.error = null;
        },
        editUserDataSuccess(state, payload) {
            state.user = {
                ...state.user,
                ...payload.payload.data
            };
            state.status = STATUS.SUCCESS;
            state.error = null;
        },
        editUserDataError(state, payload) {
            state.status = STATUS.ERROR;
            state.error = payload;
        },
        getUserDataByIdRequest(state) {
            state.status = STATUS.LOADING;
            state.error = null;
        },
        getUserDataByIdSuccess(state, payload) {
            state.user = payload.payload.data;
            state.status = STATUS.SUCCESS;
            state.error = null;
        },
        getUserDataByIdError(state, payload) {
            state.status = STATUS.ERROR;
            state.error = payload;
        }
    },
});

export default usersSlice.reducer;

export const {
    getUserDataByTokenRequest,
    getUserDataByTokenSuccess,
    getUserDataByTokenError,
    editUserDataRequest,
    editUserDataSuccess,
    editUserDataError,
    getUserDataByIdRequest,
    getUserDataByIdSuccess,
    getUserDataByIdError
} = usersSlice.actions;