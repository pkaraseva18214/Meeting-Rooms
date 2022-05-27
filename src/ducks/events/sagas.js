import {addEvent, deleteEvent, getEvents, patchEvent} from "../../services/events";
import {all, call, put, takeLatest} from "redux-saga/effects";
import {
    addEventError, addEventRequest,
    addEventSuccess, deleteEventError,
    deleteEventRequest, deleteEventSuccess,
    eventsError,
    eventsRequest,
    eventsSuccess, patchEventError,
    patchEventRequest, patchEventSuccess
} from "./index";

export function* eventsSaga(credentials) {
    try {
        const response = yield call(getEvents, credentials.payload);
        yield put(eventsSuccess(response));
    } catch (error) {
        yield put(eventsError(error));
    }
}

export function* patchEventSaga(credentials) {
    try {
        const response = yield call(patchEvent, credentials.payload);
        yield put(patchEventSuccess(response));
    } catch (error) {
        yield put(patchEventError(error))
    }
}

export function* deleteEventSaga(credentials) {
    try {
        const response = yield call(deleteEvent, credentials.payload);
        yield put(deleteEventSuccess(response));
    } catch (error) {
        yield put(deleteEventError(error));
    }
}

export function* addEventSaga(credentials) {
    try {
        const response = yield call(addEvent, credentials.payload);
        yield put(addEventSuccess(response));
    } catch (error) {
        yield put(addEventError(error));
    }
}

export default function* eventsSagaWatcher() {
    yield all([
        takeLatest(eventsRequest, eventsSaga),
        takeLatest(patchEventRequest, patchEventSaga),
        takeLatest(deleteEventRequest, deleteEventSaga),
        takeLatest(addEventRequest, addEventSaga),
    ]);
}