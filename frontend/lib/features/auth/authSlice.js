import { createSlice } from "@reduxjs/toolkit"


// Define the initial state using that type
const initialState = {
	isAuthenticated: false,
	user: null,
	token: null
}

export const auth = createSlice({
	name: 'auth',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		LOGIN: (state, action) => {
			state.isAuthenticated = true
			state.user = action.payload.user
			state.token = action.payload.token
		},
		LOGOUT: (state) => {
			state.user = null
			state.token = null
			state.isAuthenticated = false
		},

	},
})

export const { LOGIN, LOGOUT } = auth.actions

export default auth.reducer
