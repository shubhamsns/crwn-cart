import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import StripeCheckout from "react-stripe-checkout";

import { auth, firestore } from "../../firebase/firebase.utils";
import CartActionTypes from "../../redux/cart/cart.types";

const StripeCheckoutButton = ({ price, cartItems }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const priceForStripe = price * 100;
  const publishableKey = "pk_test_g5OmgBYs64zmcAVibofJVSVg00EGk51dzQ";

  const onToken = async () => {
    const { uid } = auth.currentUser;
    await firestore
      .collection("users")
      .doc(uid)
      .collection("orders")
      .add({
        order: cartItems,
        createdAt: Date.now(),
      })
      .then(() => dispatch({ type: CartActionTypes.CLEAR_ITEM_FROM_CART }))
      .catch((e) => console.log(e));

    alert("succesful payment");
    history.push("/orders");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
