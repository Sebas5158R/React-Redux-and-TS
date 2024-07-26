import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "@/features/tasks/taskSlice"
import userReducer from "@features/users/userSlice"

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        users: userReducer
    },
})

// Para que TypeScript entienda el tipo de RootState, necesitamos exportar el tipo de retorno de store.getState():
export type RootState = ReturnType<typeof store.getState>;
// Para que TypeScript entienda el tipo de AppDispatch, necesitamos exportar el tipo de store.dispatch:
export type AppDispatch = typeof store.dispatch;