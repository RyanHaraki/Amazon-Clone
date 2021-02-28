import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }] = useStateValue();

  //if user is signed in sign user out
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://www.mabaya.com/wp-content/uploads/2019/10/amazon_PNG25.png"
          className="header-logo"
        />
      </Link>

      <div className="header-search">
        <input className="header-search-input" type="text" />
        <SearchIcon className="header-searchIcon" />
        {/* {logo} */}
      </div>
      <div className="header-nav">
        <Link to={!user && "/login"} style={{ textDecoration: "none" }}>
          <div className="header-option" onClick={handleAuthentication}>
            <span className="header-option-one">
              Hello {user ? user.email : "Guest"}
            </span>
            <span className="header-option-two">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/orders" style={{ textDecoration: "none" }}>
          <div className="header-option">
            <span className="header-option-one">Returns</span>
            <span className="header-option-two">& orders</span>
          </div>
        </Link>
        <div className="header-option">
          <span className="header-option-one">Your</span>
          <span className="header-option-two">Prime</span>
        </div>
        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <div className="header-basket">
            <ShoppingBasketIcon />

            <span className="header-option-two header-basket-count">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
