import { User, uuid } from '@/hooks/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definiendo el estado inicial de los usuarios
const initialState: User[] = [
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

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        deleteUserById: (state, action: PayloadAction<uuid>) => {
            const id = action.payload
            return state.filter((user) => user.id !== id)
        }
    }
})

export const { deleteUserById } = userSlice.actions
export default userSlice.reducer