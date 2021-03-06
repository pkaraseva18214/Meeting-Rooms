export const selectEventsStatus = (state) => state.events.status;
export const selectEventsAddStatus = (state) => state.events.add_status;
export const selectEventsError = (state) => state.events.error;
export const selectEvents = (state) => state.events.events;
export const selectDate = (state) => state.events.date;
export const selectCity = (state) => state.events.city;
export const selectRoom = (state) => state.events.room;
export const selectEventById = (state, id) => state.events?.events?.find(item => String(item?._id) === id);
export const selectPatchError = (state) => state.events.patch_error;
export const selectNewPatchError = (state) => state.events?.patch_error?.error?.errors;
export const selectPatchStatus = (state) => state.events.patch_status;
export const selectPatchOkStatus = (state) => state.events?.patch_response?.payload?.statusText;
