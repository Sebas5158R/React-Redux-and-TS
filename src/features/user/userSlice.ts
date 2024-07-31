import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User, Users } from "../../hooks/types"

export const fetchUsers = createAsyncThunk<User[], void | string>(
    'user/fetchUsers', 
    async() => {
        const response = await fetch('https://randomuser.me/api/?results=5')
        const data = await response.json()
        if(!response.ok) {
            throw new Error(data.error)
        }
        return data.results
})

const DEFAULT_STATE: Users = {
    results: [] as User[],
    loading: 'idle',
} satisfies Users

const initialState: typeof DEFAULT_STATE = (() => {
    const persistedState = localStorage.getItem("__redux__users__state__")
    return persistedState ? JSON.parse(persistedState) : DEFAULT_STATE
})()

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            state.results.push(action.payload)
            state.loading = 'succeeded'
        },
        deleteUserByMail: (state, action: PayloadAction<string>) => {
            state.results = state.results.filter(user => user.email !== action.payload)
            state.loading = 'succeeded'
        },
        rollbackUser: (state, action: PayloadAction<User>) => {
            const isUserAlredyUndefined = state.results.some(user => user.email === action.payload.email)
            if(!isUserAlredyUndefined) {
                state.results.push(action.payload)
            }
        }
    },
    // Add reducers for additional action types here, and handle loading state as needed
    extraReducers: (builder) => {
        // This is for when it is pending
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = 'pending'
        })
        // This is for when it works well to query the API and get the data
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.results = action.payload
            state.loading = 'succeeded'
        })
        // This is for when the API fails
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = 'failed'
            console.log(action.error.message)
        })
    }
})

export const { addNewUser, deleteUserByMail, rollbackUser } = userSlice.actions
export default userSlice.reducer