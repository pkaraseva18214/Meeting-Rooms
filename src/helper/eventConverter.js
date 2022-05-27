//For event patch
export const convertEventToSend = (event, time, targetRoom) => {
    return {
        title: event.title,
        description: event.description,
        images: event.images,
        from: time.from,
        to: time.to,
        room: targetRoom._id,
        id: event._id,
    }
}

export const convertEventWithoutId = (event) => {
    return {
        title: event.title,
        description: event.description,
        images: event.images,
        from: event.from,
        to: event.to,
        room: event.room,
    }
}

export const getListOfUsersOfCurrentEvent = (event) => {
    return event
        .map(user => user.username)
        .join(', ')
}