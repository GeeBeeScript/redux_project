import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { useSelector, useDispatch } from "react-redux";
import { mainSliceActions } from "./components/store/main-slice";
import { sendCartData, fetchCartData } from "./components/store/cart-actions";

let isInitial = true

function App() {
  const showCart = useSelector((state) => state.main.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.main.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.changed) {
      dispatch(fetchCartData())
    }
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return 
    }

    dispatch(sendCartData(cart))
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
        title={notification.title}
        status={notification.status}
        message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;

// A 'Thunk' is a function that delays an action untill later. We can write an action
// creator as a Thunk, to ensure the action creator function does not return the 
// action itself, but another function which eventually returns the action (i.e, so that
// we can run some other code before we then dispatch the action object that we want to create).
// 
