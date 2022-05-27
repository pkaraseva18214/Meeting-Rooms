import {all, call} from 'redux-saga/effects';
import authSagaWatcher from '../ducks/auth/sagas'
import roomsSagaWatcher from "../ducks/rooms/sagas";
import eventsSagaWatcher from "../ducks/events/sagas";
import usersSagaWatcher from "../ducks/users/sagas";

export default function* createRootSaga() {
    yield all([
        call(authSagaWatcher),
        call(eventsSagaWatcher),
        call(roomsSagaWatcher),
        call(usersSagaWatcher)
    ]);
}