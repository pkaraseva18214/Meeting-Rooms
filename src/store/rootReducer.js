import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import authReducer from "../ducks/auth";
import eventsReducer from "../ducks/events";
import roomsReducer from "../ducks/rooms/index";
import usersReducer from "../ducks/users";

export const createRootReducer = (history) => {
    return combineReducers({
        router: connectRouter(history),
        auth: authReducer,
        events: eventsReducer,
        rooms: roomsReducer,
        users: usersReducer
    })
};