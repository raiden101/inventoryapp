import React, { Component } from "react";
import axios from "axios";
import Loader from "../../UI/Loader";
import ItemSpec from "./ItemSpec";

export default class OrderItem extends Component {
  state = {
    loading: true,
    item: null,
    fetchError: "",
    orderQuantity: 0
  };
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`/api/user/searchByID/${this.props.match.params.itemID}`)
      .then(({ data }) => {
        if (data.error)
          this.setState({ fetchError: data.error, loading: false });
        else this.setState({ item: data, loading: false });
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
    console.log(this.state.orderQuantity);
  }

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
                    onChange={this.onQuantityChange}
                    name="quantity"
                    min={0}
                    max={this.state.item.quantity}
                  />
                </div>
                <button
                  value={this.state.orderQuantity}
                  disabled={this.state.orderQuantity <= 0}
                  className="btn waves-effect waves-light blue lighten-2"
                >
                  Add to cart
                </button>
              </form>
            </div>
          </div>
        );
    }

    return <div>{toShow}</div>;
  }
}
