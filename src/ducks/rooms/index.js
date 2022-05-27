import {STATUS} from "../../constants/mainConstants";
import {createSlice} from "@reduxjs/toolkit";

const roomsSlice = createSlice({
    name: "@rooms",
    initialState: {
        status: STATUS.NOT_REQUESTED,
        error: null,
        rooms: [],
        freeRooms: [],
        room: null
    },
    reducers: {
        getRoomsRequest(state) {
            state.status = STATUS.LOADING;
            state.error = null;
        },
        getRoomsSuccess(state, payload) {
            state.status = STATUS.SUCCESS;
            state.error = null;
            state.rooms = payload.payload.data;
        },
        getRoomsError(state, payload) {
            state.status = STATUS.ERROR;
            state.error = payload;
        },
        getFreeRoomsRequest(state) {
            state.status = STATUS.LOADING;
            state.error = null;
        },
        getFreeRoomsSuccess(state, payload) {
            state.status = STATUS.SUCCESS;
            state.error = null;
            state.freeRooms = payload.payload.data;
        },
        getFreeRoomsError(state, payload) {
            state.status = STATUS.ERROR;
            state.error = payload;
        },
        getRoomByIdRequest(state) {
            state.status = STATUS.LOADING;
            state.error = null;
        },
        getRoomByIdSuccess(state, payload) {
            state.status = STATUS.SUCCESS;
            state.room = payload.payload.data;
            state.error = null;
        },
        getRoomByIdError(state, payload) {
            state.status = STATUS.ERROR;
            state.error = payload;
        },
        clearAllRooms(state) {
            state.rooms = [];
        },
        clearAllFreeRooms(state) {
            state.freeRooms = [];
        }
    }
});

export default roomsSlice.reducer;

export const {
    getRoomsRequest, getRoomsSuccess,
    getRoomsError, getFreeRoomsRequest,
    getFreeRoomsSuccess, getFreeRoomsError,
    getRoomByIdSuccess, getRoomByIdRequest,
    getRoomByIdError, clearAllRooms, clearAllFreeRooms,
} = roomsSlice.actions;