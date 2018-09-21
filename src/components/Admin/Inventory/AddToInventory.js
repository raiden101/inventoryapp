import React, { Component, Fragment } from "react";
import MatWrapper from '../../UI/MatWrapper/MatWrapper';
import axios from '../../../util/axios';
import { toast } from 'materialize-css';

export default class AddInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      quantity: 0,
      brandName: "",
      category: "",
      minQuantity: 0,
      expiryDate: ""
    };
  }

  onSubmitHandler = e => {
    e.preventDefault();
    axios.post('/api/admin/addToInventory', this.state)
    .then(data => {
      toast({ html: data.data });
    })
    .catch(err => {
      toast({ html: "Oops! somthing went wrong!!" });
    })
  }
  
  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Fragment>
        <h5 className="noMargin">Fill the details..</h5>
        <form onSubmit={this.onSubmitHandler}>
          <div className="row">
            <div className="input-field col s12 m6">
              <input name="itemName" type="text" onChange={this.onChangeHandler} />
              <label htmlFor="itemName">Item name</label>
            </div>
            <div className="input-field col s12 m6">
              <input name="quantity" type="number" onChange={this.onChangeHandler} />
              <label htmlFor="quantity">Quantity</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12 m6">
              <input name="brandName" type="text" onChange={this.onChangeHandler} />
              <label htmlFor="brandName">Brand name</label>
            </div>
            <div className="input-field col s12 m6">
              <input name="category" type="text" onChange={this.onChangeHandler} />
              <label htmlFor="category">Category</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12 m6">
              <input name="minQuantity" type="number" onChange={this.onChangeHandler} />
              <label htmlFor="minQuantity">Minimum quantity</label>
            </div>
            <div className="input-field col s12 m6">
              <input name="expiryDate" type="date" onChange={this.onChangeHandler} />
              <label htmlFor="expiryDate">Expiry date</label>
            </div>
          </div>

          <MatWrapper>
            <button className="btn waves-effect waves-light purple darken-2"
            style={{marginLeft: '10px'}}>
              Add to inventory
            </button>
          </MatWrapper>
        </form>
      </Fragment>
    );
  }
}
