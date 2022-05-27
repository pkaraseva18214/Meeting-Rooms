import {EVENTS_URL} from "../constants/mainConstants";
import request from "../helper/requests";
import {convertEventWithoutId} from "../helper/eventConverter";

export function getEvents() {
    return request.get(`${EVENTS_URL}`);
}

export function addEvent(event) {
    return request.post(`${EVENTS_URL}`, event)
}

export function deleteEvent(id) {
    return request.delete(`${EVENTS_URL}/${id}`);
}

export function patchEvent(event) {
    const newEvent = convertEventWithoutId(event);

    return request.patch(`${EVENTS_URL}/${event.id}`, newEvent);
}

export function eventApply(id) {
    return request.post(`${EVENTS_URL}/${id}/apply`);
}

export function eventDeny(id) {
    return request.post(`${EVENTS_URL}/${id}/deny`);
}