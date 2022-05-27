export const selectorRoomById = (id) => {
    return (state) => state.rooms.find(room => {
        return String(room.id) === id
    });
}

export const selectRooms = (state) => state.rooms.rooms;

export const selectFreeRooms = (state) => state.rooms.freeRooms;
