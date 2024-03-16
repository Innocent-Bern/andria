import { createSlice } from "@reduxjs/toolkit"


// Define the initial state using that type
const initialState = {
	chat: null
}

export const selectChat = createSlice({
	name: 'selectChat',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		SELECTCHAT: (state, action) => {
			state.chat = action.payload.chat
		}

	},
})

export const { SELECTCHAT } = selectChat.actions

export default selectChat.reducer
