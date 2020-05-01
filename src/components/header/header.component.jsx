import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import "./header.styles.scss";

import { ReactComponent as Logo } from "../../assets/crown.svg";

function Header() {
  const dispatch = useDispatch();

  const {
    user: { currentUser },
    cart: { hidden },
  } = useSelector((state) => state);

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link to="/shop" className="option">
          SHOP
        </Link>
        <Link to="/shop" className="option">
          CONTACT
        </Link>

        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon onClick={() => dispatch()} />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
}

export default Header;
