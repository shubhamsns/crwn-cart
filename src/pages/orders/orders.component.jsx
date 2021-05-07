import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import { getUserOrders } from "../../firebase/firebase.utils";
import {
  CheckoutHeaderContainer,
  CheckoutPageContainer,
  HeaderBlockContainer,
} from "../checkout/checkout.styles";

import { OrderFooter } from "./orders.styles";

import { formatDate } from "../../utils";
import Spinner from "../../components/spinner/spinner.component";

const OrdersPage = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (currentUser?.id) {
      getUserOrders(currentUser.id)
        .then((res) => res.docs)
        .then((data) => data.map((doc) => doc.data()))
        .then((data) => setOrders(data))
        .catch((e) => console.log(e));
    }
    setLoading(false);
  }, [currentUser]);

  if (loading) return <Spinner />;

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
          <span>total</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>

      {orders.length ? (
        <>
          {orders.map(({ order, createdAt }) => (
            <>
              {order.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
              ))}
              <OrderFooter>
                <h3>Order Placed On: {formatDate(new Date(createdAt))}</h3>
                <h3>
                  Total: $
                  {order.reduce((acc, ite) => {
                    return acc + ite.price * ite.quantity;
                  }, 0)}
                </h3>
              </OrderFooter>
            </>
          ))}
        </>
      ) : (
        <>
          <p>Successfull orders will be shows here</p>
          <Link to="/shop">
            <CustomButton>Shop Items</CustomButton>
          </Link>
        </>
      )}
    </CheckoutPageContainer>
  );
};
export default OrdersPage;
