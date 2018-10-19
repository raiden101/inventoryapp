import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import Loader from '../../UI/Loader';
import { getProperDate } from "../../../util/util";

export default class Orders extends Component {
  state = {
    orders: [],
    fetchError: "",
    loading: true
  };
  componentDidMount() {
    axios
      .get("/api/admin/getOrders")
      .then(({data}) => {
        if (data.error)
          this.setState({ loading: false, fetchError: data.error });
        else this.setState({ loading: false, fetchError: "", orders: data });
      })
      .catch(err => {
        this.setState({
          loading: false,
          fetchError: "Ooops! something went wrong!!"
        });
      });
  }
  render() {
    let toShow = null;
    if (this.state.orders.length > 0) {
      toShow = (
        <div className="cartItemsGrid" style={{ marginTop: "9px" }}>
          {this.state.orders.map((el, index) => {
            return (
              <div className="cartItem" 
              key={el.orderID}>
                <div className="upper">
                  <div className="_left">
                    <p>ID: {el.orderID}</p>
                    <p>Shop id: {el.shopID}</p>                  
                    <p>Item count: {el.itemCount}</p>
                  </div>
                  <div className="_right">
                    <p>Date: {getProperDate(el.orderDate)}</p>
                    <p>Cost: Rs.{el.orderCost}</p>
                  </div>
                </div>
                <div className="lower">
                  <Link to={`/admin/viewOrder/${el.orderID}`}>
                    View order
                  </Link>
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
