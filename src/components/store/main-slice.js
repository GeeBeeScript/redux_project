import { createSlice } from '@reduxjs/toolkit'


const mainSlice = createSlice({
    name: "main-slice",
    initialState: { cartIsVisible: false },
    reducers: {
        toggle (state) {
            // Below is handled by imur in redux toolkit
            state.cartIsVisible = !state.cartIsVisible
        }
    }
})

export const mainSliceActions = mainSlice.actions

export default mainSlice