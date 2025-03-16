import classes from './CartItem.module.css';

import { useDispatch } from 'react-redux';
import { cartSliceActions } from '../store/cart-slice';

const CartItem = (props) => {
  const { id, title, quantity, total, price } = props.item;

  const dispatch = useDispatch()

  const decrementHandler = () => {
    dispatch(cartSliceActions.removeItemFromCart(id))
  }

  const incrementHandler = () => {
    // dispatch(cartSliceActions.incrementItemFromCart(id))
    dispatch(cartSliceActions.addItemToCart({
      id: id,
      title: title,
      price: price
    }))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decrementHandler}>-</button>
          <button onClick={incrementHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
