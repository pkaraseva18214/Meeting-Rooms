import {
    ROOMS_URL,
    FREE_ROOMS_URL,
    ROOM_BY_ID_URL
} from "../constants/mainConstants";
import request from "../helper/requests";


export function getRooms(params) {
    return request
        .get(`${ROOMS_URL}`, {params});
}

export function getFreeRooms(params) {
    return request
        .get(`${FREE_ROOMS_URL}`, {params});
}

export function getRoomById({id}) {
    const roomURL = ROOM_BY_ID_URL.replace("{id}", id);

    return request.get(`${roomURL}`)
}
