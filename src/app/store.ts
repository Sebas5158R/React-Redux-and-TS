import { configureStore, Middleware, Tuple } from '@reduxjs/toolkit'
import taskReducer from "@/features/tasks/taskSlice"
import userReducer, { rollbackUser } from "@features/users/userSlice"
import { toast } from 'sonner'

// Middleware para persistir los datos de los usuarios
const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    next(action)
    localStorage.setItem('__redux__users__state__', JSON.stringify(store.getState().users))
}

const syncWithDatabaseMiddleware: Middleware = store => next => action => {
    const { type, payload } = action
    const previosState = store.getState()
    next(action)
    
    if (type === "users/deleteUserById") {
        const userIdToRemove = payload
        const userToRemove = previosState.users.find(user => user.id === userIdToRemove)

        fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (response.ok) {
                toast.success(`Usuario ${payload} eliminado correctamente`)
            }
            throw new Error('Error al eliminar el usuario')
        })
        .catch((error) => {
            if(userToRemove) store.dispatch(rollbackUser(userToRemove))
            console.log(error)
            toast.error(`Error al eliminar el usuario ${userIdToRemove}`)
        })
    }
}

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        users: userReducer
    },
    middleware: () => new Tuple(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware)
})

// Para que TypeScript entienda el tipo de RootState, necesitamos exportar el tipo de retorno de store.getState():
export type RootState = ReturnType<typeof store.getState>;
// Para que TypeScript entienda el tipo de AppDispatch, necesitamos exportar el tipo de store.dispatch:
export type AppDispatch = typeof store.dispatch;