import { createSlice } from '@reduxjs/toolkit'

import { mainSliceActions } from './main-slice'

const cartSlice = createSlice({
    name: "cart",
    initialState: { 
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        changed: false
     },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity
            state.items = action.payload.items
        },
        addItemToCart (state, action) {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++
            state.changed = true
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            } else {
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            state.totalQuantity--
            state.changed = true
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.quantity--
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
        },
        // We don't need this code, since we have addItemToCart
        // incrementItemFromCart(state, action) {
        //     const id = action.payload
        //     const existingItem = state.items.find(item => item.id === id)
        //     state.totalQuantity++
        //     existingItem.quantity++
        //     existingItem.totalPrice = existingItem.totalPrice + existingItem.price
        // }

        // reducers must be pure, side-effect free and asynchronous function. Side effect
        // (whether synchronous or asynchronous) code should not go here. When using 
        // redux, we can execute side-effects inside the components or inside an action
        // creator. 
        // If you are working with synchronous, side-effect free code, using reducers may
        // be a better option, than using action creators or components. 
    }
})


export const cartSliceActions = cartSlice.actions

export default cartSlice