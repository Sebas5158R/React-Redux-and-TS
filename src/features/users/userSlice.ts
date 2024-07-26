import { User, uuid } from '@/hooks/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definiendo el estado inicial de los usuarios
export const DEFAULT_STATE: User[] = [
    {
        id: '5d04e04a-66ff-4778-afd2-f91099025076',
        name: 'John Doe',
        email: 'john@gmail.com',
        github: 'johndoe'
    },
    {
        id: '984e083f-9c22-46db-bef3-6f1419a78b59',
        name: 'Haakon Dahlberg',
        email: 'haakon@gmail.com',
        github: 'haakon'
    },
    {
        id: 'e92d0b0a-910a-49d3-aaec-a4be78a82d66',
        name: 'Jane Doe',
        email: 'jane@gmail.com',
        github: 'janedoe'
    }
]

const initialState: typeof DEFAULT_STATE = (() => {
    const persistedState = localStorage.getItem('__redux__users__state__')
    // Si hay datos en localStorage, los cargamos, de lo contrario, cargamos el estado por defecto.
    return persistedState ? JSON.parse(persistedState) : DEFAULT_STATE
})() // Esta función se ejecuta solo una vez y se auto invoca.

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            return [...state, { ...action.payload }]
        },
        deleteUserById: (state, action: PayloadAction<uuid>) => {
            const id = action.payload
            return state.filter((user) => user.id !== id)
        },
        // Esta acción se encarga de deshacer la eliminación de un usuario si falla la petición a la API.
        rollbackUser: (state, action: PayloadAction<User>) => {
            const isUserAlredyUndefined = state.some(user => user.id === action.payload.id)
            if(!isUserAlredyUndefined) {
                state.push(action.payload)
            }
        }   
    }
})

export const { addNewUser, deleteUserById, rollbackUser } = userSlice.actions
export default userSlice.reducer