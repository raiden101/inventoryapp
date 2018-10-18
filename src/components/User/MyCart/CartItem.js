import React from "react";
import { Link } from "react-router-dom";
import "./cart.css";

export default function cartItem({
  itemID,
  quantity,
  brandName,
  itemName,
  totalPrice,
  pricePerUnit,
  available
}) {
  let icon = (available === 1) ? "fa fa-check available" : "fa fa-times notAvailable";
  return (
    <Link to={`/user/viewItem/${itemID}?fromCart=true`}>
      <i className="fa fa-uncheck"></i>
      <div className="cartItem">
        <div className="upper">
          <div className="_left">
            <h5>{brandName}</h5>
            <h6>{itemName}</h6>
          </div>
          <div className="_right">
            <h5>Order Quantity: {quantity}</h5>
            <h6>Price/Unit: Rs.{pricePerUnit}</h6>
          </div>
        </div>
        <div className="lower">
          <h5>
            Availability: <i className={icon} />
          </h5>
          <h5>Total Price: Rs.{totalPrice}</h5>
        </div>
      </div>
    </Link>
  );
}
