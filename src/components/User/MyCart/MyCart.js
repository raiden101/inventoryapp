import React, { Component } from 'react'
import axios from 'axios';
import CartItem from './CartItem'; 
import { toast   } from 'materialize-css';

import Loader from '../../UI/Loader';

export default class MyCart extends Component {
  state = {
    cartItems: [],
    loading: true,
    fetchError: "",
    removingFromCart: false,
    totalCartCost: 0
  }

  orderAll = () => {
    this.setState({ loading: true });
    axios
      .get('/api/user/orderAll')
      .then(({data}) => {
        this.setState({ loading: false });
        if(data.match(/error/i) === null)
          this.setState({ cartItems: [], totalCartCost: 0 });
        toast({ html: data });
      })
      .catch(err => { 
        this.setState({ loading: false });        
        toast({ html: "Error while ordering!!" }) 
      })
  }

  removeFromLocalCart = iid => {
    let items = this.state.cartItems;
    let index = items.findIndex(({itemID}) => itemID === iid);
    if(index !== -1) {
      let p = this.state.totalCartCost - items[index].totalPrice
      items.splice(index, 1);
      this.setState(prevState => {
        return {
          ...prevState,
          cartItems: [...items],
          totalCartCost: p
        }
      });
      
    }
  }

  removeFromCart = (e, itemID) => {
    e.preventDefault(); 
    this.setState({ loading: true })
    axios
      .get(`/api/user/removeFromCart/${itemID}`)
      .then(({data}) => {
        this.setState({ loading: false });
        if(data.match(/error/i) === null)
          this.removeFromLocalCart(itemID);
        toast({ html: data })
      })
      .catch(err => { 
        this.setState({ loading: false });
        toast({ html: 'Error while removing item!!' }); 
    })
  }
  
  componentDidMount() {
    axios
      .get('/api/user/getCartItems')
      .then(({data}) => {
        if(data.error)
          this.setState({ fetchError: data.error, loading: false });
        else 
          this.setState({ 
            cartItems: data.cartItems, 
            loading: false,
            totalCartCost: data.totalCost
         })
      })
      .catch(err => {
        this.setState({ fetchError: "Oops!somethin went wrong!!", loading: false });
      })
  }

  render() {
    let toShow = null;
    if(this.state.fetchError !== "")
      toShow = (<center className="centerOfPage">
        <p>{this.state.fetchError}</p>
      </center>);
    else if(this.state.loading === true)
      toShow = (<center><Loader /></center>);
    else if(this.state.cartItems.length > 0)
      toShow = (
        <div className="cartContainer">
          <div className="row">
            <button className="indigo btn waves-effect lighten-1"
            onClick={this.orderAll}>
              <i className="fa fa-shopping-cart"></i>
              Order All (Rs.{this.state.totalCartCost})
            </button>
          </div>
          <div className="row">
            <div className="cartItemsGrid">
              {this.state.cartItems.map(item => {
                  return <CartItem {...item} key={item.itemID} 
                  onItemDelete={e => this.removeFromCart(e, item.itemID)} />
              })}
            </div>
          </div>
        </div> 
      );
    else if(this.state.cartItems.length === 0)
      toShow = (<h6><center>No items in your cart!</center></h6>);
    return (
      <div className="cart">
        {toShow}
      </div>
    )
  }
}
