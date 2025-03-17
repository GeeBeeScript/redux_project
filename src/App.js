import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { useSelector, useDispatch } from "react-redux";
import { mainSliceActions } from "./components/store/main-slice";

let isInitial = true

function App() {
  const showCart = useSelector((state) => state.main.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.main.notification);
  const dispatch = useDispatch();

  // This is not the best, because we will send an empty cart on initial render to the
  // database
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        mainSliceActions.setNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data",
        })
      );
      // const response = await fetch(
      //   "https://react-http-project-71044-default-rtdb.firebaseio.com/cart.json",
      //   {
      //     method: "PUT",
      //     body: JSON.stringify(cart),
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error("There was an error");
      // }
      // const responseData = await response.json();
      dispatch(
        mainSliceActions.setNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully...",
        })
      );
    };

    if (isInitial) {
      isInitial = false
      return
    }

    sendCartData().catch((error) => {
      dispatch(
        mainSliceActions.setNotification({
          status: "failed",
          title: "Failed",
          message: "Cart data failed to send",
        })
      );
    });
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
