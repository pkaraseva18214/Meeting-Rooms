import {put, all, takeLatest, call} from 'redux-saga/effects';
import {login, register} from "../../services/auth";
import {loginError, loginRequest, loginSuccess, registerError, registerRequest, registerSuccess} from "./index";

export function* loginSaga(credentials) {
    try {
        const response = yield call(login, credentials.payload);
        yield put(loginSuccess(response));
    } catch (error) {
        yield put(loginError(error));
    }
}

export function* registerSaga(credentials) {
    try {
        const response = yield call(register, credentials.payload);
        yield put(registerSuccess(response));
    } catch (error) {
        yield put(registerError(error));
    }
}

export default function* authSagaWatcher() {
    yield all([
        takeLatest(loginRequest, loginSaga),
        takeLatest(registerRequest, registerSaga),
    ]);
}