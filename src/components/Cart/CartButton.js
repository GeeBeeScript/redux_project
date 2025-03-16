import { useSelector, useDispatch } from 'react-redux'

import classes from './CartButton.module.css';
import { mainSliceActions } from '../store/main-slice';

const CartButton = (props) => {
  const dispatch = useDispatch()
  const cartItemQty = useSelector(state => state.cart.totalQuantity)

  const toggleCartHandler = () => {
    dispatch(mainSliceActions.toggle())
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{ cartItemQty }</span>
    </button>
  );
};

export default CartButton;
