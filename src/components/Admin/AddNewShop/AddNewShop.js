import React, { Component } from "react";
import MatWrapper from "../../UI/MatWrapper";
import axios from "axios";
import { toast } from "materialize-css";

export default class AddNewShop extends Component {
  state = {
    ownerName: "",
    phoneNumber: "",
    shopAddress: "",
    shopName: "",
    telephoneNumber: ""
  };
  onSubmitHandler = e => {
    e.preventDefault();
    let data = {
      owner: {
        name: this.state.ownerName,
        phoneNumber: this.state.phoneNumber
      },
      shop: {
        address: this.state.shopAddress,
        name: this.state.shopName,
        telephone: this.state.telephoneNumber
      }
    };
    axios
      .post("/api/admin/addNewShop", data)
      .then(({ data }) => {
        toast({ html: `${data.msg}` });
        if (data.success)
          this.setState({
            ownerName: "",
            phoneNumber: "",
            shopAddress: "",
            shopName: "",
            telephoneNumber: "",
          });
      })
      .catch(err => {
        toast({ html: "Ooops!! something went wrong" });
      });
  };
  onInputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <MatWrapper colSpec="col s12">
        <form onSubmit={this.onSubmitHandler}>
          <h5 className="noMargin noPadding">Enter Shop Owner details.</h5>
          <div className="row">
            <div className="col s12 m6 input-field">
              <input
                type="text"
                name="ownerName"
                value={this.state.ownerName}
                onChange={this.onInputHandler}
              />
              <label htmlFor="ownerName">Owner name</label>
            </div>
            <div className="col s12 m6 input-field">
              <input
                type="number"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.onInputHandler}
              />
              <label htmlFor="phoneNumber">Phone number</label>
            </div>
          </div>
          {/* <hr /> */}
          <h5>Enter shop details</h5>
          <div className="row">
            <div className="col s12 m6 input-field">
              <input
                type="text"
                name="shopName"
                value={this.state.shopName}
                onChange={this.onInputHandler}
              />
              <label htmlFor="shopName">Shop name</label>
            </div>
            <div className="col s12 m6 input-field">
              <input
                type="text"
                name="shopAddress"
                value={this.state.shopAddress}
                onChange={this.onInputHandler}
              />
              <label htmlFor="shopAddress">Shop address</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m6 input-field">
              <input
                type="text"
                name="telephoneNumber"
                value={this.state.telephoneNumber}
                onChange={this.onInputHandler}
              />
              <label htmlFor="telephoneNumber">Telephone number</label>
            </div>
          </div>
          <MatWrapper colSpec="col s12">
            <button className="btn waves-effect waves-light purple darken-3">
              Done
            </button>
          </MatWrapper>
        </form>
      </MatWrapper>
    );
  }
}
