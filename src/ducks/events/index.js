import {STATUS} from "../../constants/mainConstants";
import {createSlice} from "@reduxjs/toolkit";
import {Temporal} from "@js-temporal/polyfill";

const eventsSlice = createSlice({
    name: "@events",
    initialState: {
        status: STATUS.NOT_REQUESTED,
        events: [],
        error: null,
        date: Temporal.Now.plainDateISO(),
        city: '',
        room: '',
        patch_status: STATUS.NOT_REQUESTED,
        patch_error: null,
        patch_response: '',
        delete_status: STATUS.NOT_REQUESTED,
        delete_error: null,
        delete_response: '',
        add_status: STATUS.NOT_REQUESTED,
        add_error: null,
        add_response: '',
    },
    reducers: {
        eventsRequest(state) {
            state.status = STATUS.LOADING;
            state.error = null;
        },
        eventsSuccess(state, payload) {
            state.status = STATUS.SUCCESS;
            state.events = payload.payload.data.data;
        },
        eventsError(state, payload) {
            state.status = STATUS.ERROR;
            state.error = payload;
        },
        eventsByCurrentDate(state, payload) {
            state.date = payload.payload;
        },
        eventsByCurrentCity(state, payload) {
            state.city = payload.payload;
        },
        eventsByCurrentRoom(state, payload) {
            state.room = payload.payload;
        },
        patchEventRequest(state) {
            state.patch_status = STATUS.LOADING;
            state.patch_error = null;
        },
        patchEventSuccess(state, payload) {
            state.patch_status = STATUS.SUCCESS;
            state.patch_response = payload;
            state.patch_error = null;
            state.date = Temporal.Now.plainDateISO();
            state.city =  '';
            state.room = '';
        },
        patchEventError(state, payload) {
            state.patch_status = STATUS.ERROR;
            state.patch_error = payload?.payload?.errorCode;
        },
        deleteEventRequest(state) {
            state.delete_status = STATUS.LOADING;
            state.delete_error = null;
        },
        deleteEventSuccess(state, payload) {
            state.delete_status = STATUS.SUCCESS;
            state.delete_response = payload;
            state.delete_error = null;
        },
        deleteEventError(state, payload) {
            state.delete_status = STATUS.ERROR;
            state.delete_error = payload;
        },
        addEventRequest(state) {
            state.add_status = STATUS.LOADING;
            state.add_error = null;
        },
        addEventSuccess(state, payload) {
            state.add_status = STATUS.SUCCESS;
            state.add_response = payload;
            state.add_error = null;
        },
        addEventError(state, payload) {
            state.add_status = STATUS.ERROR;
            state.add_error = payload;
        },
        resetAddEventStatus(state) {
            state.add_status = STATUS.NOT_REQUESTED;
            state.patch_response = null;
            state.add_error = null;
            state.date = Temporal.Now.plainDateISO();
            state.city =  '';
            state.room = '';
            state.patch_status = STATUS.NOT_REQUESTED;
            state.delete_status = STATUS.NOT_REQUESTED;
        },
    },
});

export default eventsSlice.reducer;

export const {
    eventsRequest,
    eventsSuccess,
    eventsError,
    eventsByCurrentDate,
    eventsByCurrentCity,
    eventsByCurrentRoom,
    patchEventRequest,
    patchEventSuccess,
    patchEventError,
    deleteEventRequest,
    deleteEventSuccess,
    deleteEventError,
    addEventRequest,
    addEventSuccess,
    addEventError,
    resetAddEventStatus,
} = eventsSlice.actions