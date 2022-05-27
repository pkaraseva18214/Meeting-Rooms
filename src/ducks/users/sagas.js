import {put, all, takeLatest, call} from 'redux-saga/effects';
import {
    editUserDataError,
    editUserDataRequest,
    editUserDataSuccess,
    getUserDataByIdError,
    getUserDataByIdRequest,
    getUserDataByIdSuccess,
    getUserDataByTokenError,
    getUserDataByTokenRequest,
    getUserDataByTokenSuccess
} from "./index";
import {editUserData, getUserById, getUserByToken} from "../../services/users";


export function* getUserByTokenSaga() {
    try {
        const response = yield call(getUserByToken);
        yield put(getUserDataByTokenSuccess(response.data));
    } catch (error) {
        yield put(getUserDataByTokenError(error));
    }
}

export function* getUserByIdSaga(credentials) {
    try {
        const response = yield call(getUserById, credentials.payload);
        yield put(getUserDataByIdSuccess(response.data));
    } catch (error) {
        yield put(getUserDataByIdError(error));
    }
}

export function* editUserDataSaga(credentials) {
    try {
        const response = yield call(editUserData, credentials.payload);
        const userData = response.data;
        delete userData.data.events;
        yield put(editUserDataSuccess(userData));
    } catch (error) {
        yield put(editUserDataError(error));
    }
}

export default function* usersSagaWatcher() {
    yield all([
        takeLatest(getUserDataByTokenRequest, getUserByTokenSaga),
        takeLatest(getUserDataByIdRequest, getUserByIdSaga),
        takeLatest(editUserDataRequest, editUserDataSaga)
    ]);
}