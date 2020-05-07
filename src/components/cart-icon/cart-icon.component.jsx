import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selector";

import {
  ShoppingIcon,
  ItemCountContainer,
  CartContainer,
} from "./cart-icon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();
  const { itemCount } = useSelector(
    createStructuredSelector({
      itemCount: selectCartItemsCount,
    })
  );

  return (
    <CartContainer>
      <ShoppingIcon
        className="shopping-icon"
        onClick={() => dispatch(toggleCartHidden())}
      />
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartContainer>
  );
};

export default CartIcon;
