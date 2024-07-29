import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RequestState, Users } from "../../hooks/types"

export const fetchUsers = createAsyncThunk<Users | string>(
    'user/fetchUsers', 
    async() => {
        const response = await fetch('https://randomuser.me/api/?results=5')
        const data = await response.json()
        if(!response.ok) {
            throw new Error(data.error)
        }
        return data.results
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        usersData: {} as Users,
        status: {} as RequestState,
        error: null
    },
    reducers: {},
    // Add reducers for additional action types here, and handle loading state as needed
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'pending'
            state.error = null
        })
        // This is for when it works well to query the API and get the data
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.usersData = action.payload as Users
            state.error = null
        })
    }
})

export default userSlice.reducer