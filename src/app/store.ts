import { configureStore, Middleware } from "@reduxjs/toolkit"
import userReducer, { rollbackUser } from "../features/user/userSlice"
import { toast } from "sonner";
import { User } from "../hooks/types";

// Middleware para guardar el estado en el local storage
const persistanceLocalStorageMiddleware: Middleware = ( store ) => ( next ) => ( action ) => {
    next(action);
    localStorage.setItem("__redux__users__state__", JSON.stringify(store.getState().users))
}

const syncWithDatabaseMiddleware: Middleware = store => next => action => {
    const { type, payload } = action as { type: string, payload: string }
    const previosState = store.getState()
    next(action)

    if(type === "users/deleteUserByMail") {
        const userMailToRemove = payload
        const userToRemove = previosState.users.results.find((user: User) => user.email === userMailToRemove)
        
        if(userToRemove) {
            fetch(`https://jsonplaceholder.typicode.com/users/${userMailToRemove}`, {
                method: 'DELETE',
            })
            .then((response) => {
                if (response.ok) {
                    toast.success(`Usuario ${payload} eliminado correctamente`)
                    return response.json()
                }
                throw new Error('Error al eliminar el usuario')
            })
            .catch((error) => {
                if(userToRemove) store.dispatch(rollbackUser(userToRemove))
                console.log(error)
                toast.error(`Error al eliminar el usuario ${userMailToRemove}`)
            })
        }
                
    }
}

export const store = configureStore({
    reducer: {
        users: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware),
});