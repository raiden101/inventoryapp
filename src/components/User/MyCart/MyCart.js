import React, { Component } from 'react'
import axios from 'axios';
import CartItem from './CartItem'; 

import Loader from '../../UI/Loader';

export default class MyCart extends Component {
  state = {
    cartItems: [],
    fetchingItems: true,
    fetchError: ""
  }
  
  componentDidMount() {
    axios
      .get('/api/user/getCartItems')
      .then(({data}) => {
        if(data.error)
          this.setState({ fetchError: data.error, fetchingItems: false });
        else 
          this.setState({ cartItems: data.data, fetchingItems: false })
      })
      .catch(err => {
        this.setState({ fetchError: "Oops!somethin went wrong!!", fetchingItems: false });
      })
  }

  render() {
    let toShow = null;
    if(this.state.fetchError !== "")
      toShow = (<center className="centerOfPage">
        <p>{this.state.fetchError}</p>
      </center>);
    else if(this.state.fetchingItems === true)
      toShow = (<center><Loader /></center>);
    else if(this.state.cartItems.length > 0)
      toShow = this.state.cartItems.map(item => {
        return <CartItem {...item} key={item.itemID} />
      })
    else if(this.state.cartItems.length === 0)
      toShow = (<h5><center>No items Found!!</center></h5>);
    return (
      <div className="cart">
        {toShow}
      </div>
    )
  }
}
