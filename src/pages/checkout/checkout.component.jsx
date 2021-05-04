import React from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer,
} from "./checkout.styles";
import CustomButton from "../../components/custom-button/custom-button.component";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cartItems, total } = useSelector(
    createStructuredSelector({
      cartItems: selectCartItems,
      total: selectCartTotal,
    })
  );

  const { currentUser } = useSelector(
    createStructuredSelector({
      currentUser: selectCurrentUser,
    })
  );

  return (
    <CheckoutPageContainer>
      <CheckoutHeaderContainer>
        <HeaderBlockContainer>
          <span>Product</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Description</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Quantity</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Price</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <TotalContainer>TOTAL: ${total}</TotalContainer>
      <WarningContainer>
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 'Any Future Date' - CVV: 123
      </WarningContainer>

      {currentUser ? (
        <StripeCheckoutButton price={total} />
      ) : (
        <Link to="/signin">
          <CustomButton>Sign in to Checkout</CustomButton>
        </Link>
      )}
    </CheckoutPageContainer>
  );
};

export default Checkout;
