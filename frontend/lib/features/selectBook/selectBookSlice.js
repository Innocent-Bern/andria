import { createSlice } from "@reduxjs/toolkit"


// Define the initial state using that type
const initialState = {
	selectedBook: null
}

export const selectBook = createSlice({
	name: 'selectBook',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		SELECTBOOK: (state, action) => {
			state.selectedBook = action.payload.book
		}

	},
})

export const { SELECTBOOK } = selectBook.actions

export default selectBook.reducer
