import { createSlice } from '@reduxjs/toolkit'

import { mainSliceActions } from './main-slice'

const cartSlice = createSlice({
    name: "cart",
    initialState: { 
        items: [],
        totalQuantity: 0,
        totalAmount: 0
     },
    reducers: {
        addItemToCart (state, action) {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++
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

// creating a Thunk

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            mainSliceActions.setNotification({
                status: "pending",
                title: "Sending...",
                message: "Sending cart data",
            })
        )
        const sendRequest = async () => {
            const response = await fetch(
                "https://react-http-project-71044-default-rtdb.firebaseio.com/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify(cart),
                }
            );

            if (!response.ok) {
                throw new Error("There was an error");
            }
        }
    
        try {
            await sendRequest()
            dispatch(
                mainSliceActions.setNotification({
                  status: "success",
                  title: "Success",
                  message: "Sent cart data successfully...",
                })
            );
        } catch (error) {
            dispatch(
                mainSliceActions.setNotification({
                  status: "failed",
                  title: "Failed",
                  message: "Cart data failed to send",
                })
            );
        }

    }
}

export const cartSliceActions = cartSlice.actions

export default cartSlice