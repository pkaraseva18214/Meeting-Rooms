export const selectLogin = (state) => state.auth.isLoggedIn;
export const selectError = (state) => state.auth.error;

export const selectUsername = (state) => state.auth.username;