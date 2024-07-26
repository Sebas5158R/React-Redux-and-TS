import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

// Definiendo el estado inicial de los usuarios
const initialState: User[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@gmail.com',
        github: 'johndoe'
    },
    {
        id: '2',
        name: 'Haakon Dahlberg',
        email: 'haakon@gmail.com',
        github: 'haakon'
    },
    {
        id: '3',
        name: 'Jane Doe',
        email: 'jane@gmail.com',
        github: 'janedoe'
    }
]

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {}
})

export default userSlice.reducer