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
  available,
  onItemDelete,
  onItemOrder
}) {
  let icon =
    available === 1 ? "fa fa-check green-text" : "red-text fa fa-times notAvailable";
  return (
    <Link to={`/user/viewItem/${itemID}`}>
      <div className="cartItem">
        <div className="upper">
          <div className="_left">
            <h6><u><b>{brandName}</b></u></h6>
            <p>{itemName}</p>
            <p>Order quantity: {quantity}</p>
            <p>Price/unit: Rs.{pricePerUnit}</p>
          </div>
          <div className="_right">
            <i className="fa fa-trash grey-text"
            onClick={onItemDelete} />
            <h6>Price: Rs.{totalPrice}</h6>
          </div>
        </div>
        <div className="lower">
          <h6>
            Availability: <i className={icon} />
          </h6>
          <button className="btn teal lighten-2"
          onClick={onItemOrder}
          disabled={available === 1 ? false : true}>
            <i className="fa fa-shopping-cart" />
            Order
          </button>
        </div>
      </div>
    </Link>
  );
}
