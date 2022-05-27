import {all, call, put, takeLatest} from 'redux-saga/effects';
import {getFreeRooms, getRoomById, getRooms} from "../../services/rooms";
import {
    getFreeRoomsError,
    getFreeRoomsRequest,
    getFreeRoomsSuccess, getRoomByIdError,
    getRoomByIdRequest, getRoomByIdSuccess,
    getRoomsError,
    getRoomsRequest,
    getRoomsSuccess
} from "./index";

function* roomsSaga(credentials) {
    try {
        const response = yield call(getRooms, credentials.payload);
        yield put(getRoomsSuccess(response.data));
    } catch (error) {
        yield put(getRoomsError(error));
    }
}

function* freeRoomsSaga(credentials) {
    try {
        const response = yield call(getFreeRooms, credentials.payload);
        yield put(getFreeRoomsSuccess(response.data));
    } catch (error) {
        yield put(getFreeRoomsError(error));
    }
}

function* roomByIdSaga(credentials) {
    try {
        const response = yield call(getRoomById, credentials.payload);
        yield put(getRoomByIdSuccess(response.data));
    } catch (error) {
        yield put(getRoomByIdError(error));
    }
}

export default function* roomsSagaWatcher() {
    yield all([
        takeLatest(getRoomsRequest, roomsSaga),
        takeLatest(getFreeRoomsRequest, freeRoomsSaga),
        takeLatest(getRoomByIdRequest, roomByIdSaga)
    ]);
}

