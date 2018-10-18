import React, { Component } from "react";
import axios from "axios";

import Loader from "../../UI/Loader";
import ItemSpec from "./ItemSpec";
import { toast } from "materialize-css";

export default class OrderItem extends Component {
  state = {
    loading: true,
    item: null,
    fetchError: "",
    orderQuantity: 0,
    addingToCart: false,
    fromCart: false,
    removingFromCart: false
  };
  componentDidMount() {
    let searchP = new URLSearchParams(this.props.location.search);
    if (searchP.get("fromCart") === "true") this.setState({ fromCart: true });

    this.setState({ loading: true });
    axios
      .get(`/api/user/itemInfo/${this.props.match.params.itemID}`)
      .then(({ data }) => {
        if (data.error)
          this.setState({ fetchError: data.error, loading: false });
        else {
          this.setState({
            orderQuantity: data[0] && data[0].quantity ? data[0].quantity : 0,
            item: data[1],
            loading: false
          });
        }
      })
      .catch(err => {
        this.setState({
          fetchError: "Ooops!! something went wrong!!",
          loading: false
        });
      });
  }
  removeFromCart = () => {
    this.setState({ removingFromCart: true });
    axios
      .get(`/api/user/removeFromCart/${this.props.match.params.itemID}`)
      .then(({data}) => {
        this.setState({ removingFromCart: false });
        // if no error
        if(!data.match(/error/i)) 
          this.setState({ fromCart: false, orderQuantity: 0 });
        toast({ html: data })
      })
      .catch(err => { 
        this.setState({ removingFromCart: false });
        toast({ html: 'Error while removing item!!' 
      }); 
    })
  }

  onSubmitHandler = e => {
    e.preventDefault();
    if (this.state.item && this.state.item.itemID) {
      this.setState({ addingToCart: true });
      axios
        .post("/api/user/addToCart", {
          itemID: this.state.item.itemID,
          quantity: this.state.orderQuantity
        })
        .then(({ data }) => {
          this.setState({ addingToCart: false });
          toast({ html: `${data}` });
        })
        .catch(err => {
          this.setState({ addingToCart: false });
          toast({ html: "Ooops!!something went wrong!" });
        });
    }
  };

  onQuantityChange = e => {
    this.setState({ orderQuantity: e.target.value });
  };

  render() {
    let toShow;
    if (this.state.loading)
      toShow = (
        <center>
          <Loader color="blue" />
        </center>
      );
    else {
      if (this.state.fetchError !== "")
        toShow = (
          <center>
            <h6>{this.state.fetchError}</h6>
          </center>
        );
      else if (this.state.item !== null)
        toShow = (
          <div className="row">
            <div className="col s12 m8 l7">
              {/* <h5>Item information</h5> */}
              {/* <hr/> */}
              <ItemSpec {...this.state.item} />
              <form onSubmit={this.onSubmitHandler}>
                <div className="input-field">
                  <label htmlFor="quantity">Select quantity</label>
                  <input
                    type="number"
                    value={this.state.orderQuantity}
                    onChange={this.onQuantityChange}
                    name="quantity"
                    min={0}
                    max={this.state.item.quantity}
                  />
                </div>
                <div className="row" style={{marginLeft: '0px'}}>
                  <button
                    value={this.state.orderQuantity}
                    disabled={
                      this.state.orderQuantity <= 0 || this.state.addingToCart
                    }
                    className="btn waves-effect waves-light blue lighten-2"
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    onClick={this.removeFromCart}
                    style={{marginLeft: '20px', display: this.state.fromCart ? "inline-block": "none"}}
                    value={this.state.orderQuantity}
                    disabled={
                      this.state.orderQuantity <= 0 || this.state.removingFromCart
                    }
                    className="btn waves-effect waves-light red lighten-2"
                  >
                    Remove from cart
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
        );
    }

    return <div>{toShow}</div>;
  }
}
