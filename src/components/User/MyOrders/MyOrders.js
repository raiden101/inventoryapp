import React from "react";
import axios from "axios";

import { Link } from 'react-router-dom';

import { getProperDate } from '../../../util/util';

import Loader from "../../UI/Loader";
import "./MyOrders.css";
import "../MyCart/cart.css";

export default class extends React.Component {
  state = {
    loading: true,
    orderList: [],
    fetchError: ""
  };

  componentDidMount() {
    axios
      .get("/api/user/getOrders")
      .then(({ data }) => {
        if (data.error)
          this.setState({
            fetchError: data.error,
            loading: false,
            orderList: []
          });
        else this.setState({ orderList: data, loading: false, fetchError: "" });
      })
      .catch(err => {
        this.setState({
          fetchError: "Oops!something went wrong!",
          loading: false
        });
      });
  }
 
  render() {

    let toShow = null;
    if (this.state.orderList.length > 0) {
      toShow = (
        <div className="cartItemsGrid">
          {this.state.orderList.map((el, index) => {
            return (
              <div className="cartItem" key={el.orderID}>
                <div className="upper">
                  <div className="_left">
                    <h6>Order ID: {el.orderID}</h6>
                    <p>Order date: {getProperDate(el.orderDate)}</p>
                    <p>Total items: {el.itemCount}</p>
                    <p>Order cost: Rs.{el.orderCost}</p>
                  </div>
                </div>
                <div className="lower">
                  <Link to={`/user/viewOrder/${el.orderID}`}>View order</Link>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else if (this.state.loading)
      toShow = (
        <center>
          <Loader />
        </center>
      );
    else if (this.state.fetchError)
      toShow = (
        <center>
          <p>{this.state.fetchError}</p>
        </center>
      );
    return toShow;
  }
}
