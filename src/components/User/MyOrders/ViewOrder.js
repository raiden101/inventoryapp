import React, { Component } from 'react'
import axios from 'axios';

import Loader from '../../UI/Loader';
import { getProperDate } from '../../../util/util';

export default class ViewOrder extends Component {
  state = {
    loading: true,
    fetchError: "",
    orderItems: []
  }

  componentDidMount() {
    let orderID = this.props.match.params.orderID;
    axios
      .post('/api/user/getOrderedItems', { orderID })
      .then(({data}) => {
        if(data.error)
          this.setState({ loading: false, fetchError: data.error });
        else
          this.setState({ loading: false, orderItems: data, fetchError: "" });
      })
      .catch(_ => {
        this.setState({ loading: false, fetchError: "Errorr!!" });
      })
  }
  render() {
    let toShow = null;
    if(this.state.fetchError !== "")
      toShow = (<center><p>{this.state.fetchError}</p></center>);
    else if(this.state.loading)
      toShow = (<center><Loader color="blue" /></center>);
    else if(this.state.orderItems.length > 0) {
      toShow = (
        <table>
          <thead>
            <tr>
              <th>Brand name</th>
              <th>Item name</th>
              <th>Price/unit</th>
              <th>Quantity</th>
              <th>Expiry date</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.orderItems.map(el => {
                return (
                  <tr key={el.itemID}>
                    <td>{el.brandName}</td>
                    <td>{el.itemName}</td>
                    <td>{el.pricePerUnit}</td>
                    <td>{el.quantity}</td>
                    <td>{getProperDate(el.expiryDate)}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      )
    }
    return toShow;
  }
}
