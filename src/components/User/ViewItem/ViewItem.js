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
    addingToCart: false
  };
  componentDidMount() {

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
                  <i className="fa fa-plus" 
                    style={{marginRight: '5px', fontSize: '16px'}}>
                    </i>
                    Add to cart
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
