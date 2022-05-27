export const STATUS = {
    NOT_REQUESTED: 'notRequested',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
}

export const PATH = {
    HOME: '/home',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    ROOT: '/',
    BOOKING: '/booking',
    FREE_ROOMS: '/free_rooms',
    USERS: '/users',
    EVENTS: '/events',
    MY_EVENTS: '/my_events',
    NOT_FOUND: '*',
}

export const BASE_URL = 'https://peregovorki-js.noveogroup.com/';
export const LOGIN_URL = 'auth/login';
export const REGISTER_URL = 'auth/create';
export const EVENTS_URL = 'events';
export const ROOMS_URL = 'rooms';
export const FREE_ROOMS_URL = 'rooms/free';
export const ROOM_BY_ID_URL = 'rooms/{id}';
export const USER_BY_ID_URL = 'users/{id}';
export const USERS_URL = '/users';
export const ME_URL = 'auth/me';
