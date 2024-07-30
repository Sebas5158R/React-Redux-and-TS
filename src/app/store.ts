import { configureStore, Middleware } from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"

// Middleware para guardar el estado en el local storage
const persistanceLocalStorageMiddleware: Middleware = ( store ) => ( next ) => ( action ) => {
    next(action);
    localStorage.setItem("__redux__users__state__", JSON.stringify(store.getState().users))
}

export const store = configureStore({
    reducer: {
        users: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistanceLocalStorageMiddleware)
});