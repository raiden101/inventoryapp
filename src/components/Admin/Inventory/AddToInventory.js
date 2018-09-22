import React, { Component, Fragment } from "react";
import { toast } from "materialize-css";
import { connect } from "react-redux";

import axios from "../../../util/axios";
import * as invAT from "../../../actionTypes/inventory";

class AddToInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      quantity: "",
      brandName: "",
      category: "",
      minQuantity: "",
      expiryDate: "",
      pricePerUnit: ""
    };
  }

  dateInProperFormat = d => {
    let mydate = new Date(d);
    let month = mydate.getMonth() + 1;
    let date = mydate.getDate();
    if (month < 10) month = `0${month}`;
    if (date < 10) date = `0${date}`;
    return `${mydate.getFullYear()}-${month}-${date}`;
  };

  componentDidMount() {
    let { selectedItem } = this.props;
    if (selectedItem) {
      selectedItem = { ...selectedItem };
      selectedItem["expiryDate"] = this.dateInProperFormat(
        selectedItem["expiryDate"]
      );
      this.setState(selectedItem);
    }
  }

  onSubmitHandler = e => {
    e.preventDefault();
    let isUpdate = this.props.selectedItem;
    let { 
      itemName, pricePerUnit, quantity,
      brandName, category, minQuantity, expiryDate 
    } = this.state;
    let apiurl, newitem;
    if(isUpdate) {
      apiurl = "/api/admin/updateInventoryItem";
      newitem = {
        itemName, pricePerUnit, quantity, brandName,
        category, minQuantity, expiryDate, itemID: this.state.itemID
      };
    }else {
      apiurl = "/api/admin/addToInventory";
      newitem = {
        itemName, pricePerUnit, quantity, brandName,
        category, minQuantity, expiryDate
      };
    }
    axios
      .post(apiurl, newitem)
      .then(({data}) => {
        toast({ html: `${data}` });
        if(isUpdate) 
          this.props.updateItem(this.props.selectItemIndex, newitem);
      })
      .catch(err => {
        toast({ html: "Oops! somthing went wrong!!" });
      });
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Fragment>
        <h5 className="noMargin">Fill the details..</h5>
        <form onSubmit={this.onSubmitHandler}>
          <div className="row">
            <div className="input-field col s12 m6">
              <input
                name="itemName"
                type="text"
                onChange={this.onChangeHandler}
                value={this.state.itemName}
              />
              <label htmlFor="itemName">Item name</label>
            </div>
            <div className="input-field col s12 m6">
              <input
                name="quantity"
                type="number"
                onChange={this.onChangeHandler}
                value={this.state.quantity}
              />
              <label htmlFor="quantity">Quantity</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12 m6">
              <input
                name="brandName"
                type="text"
                onChange={this.onChangeHandler}
                value={this.state.brandName}
              />
              <label htmlFor="brandName">Brand name</label>
            </div>
            <div className="input-field col s12 m6">
              <input
                name="pricePerUnit"
                type="number"
                onChange={this.onChangeHandler}
                value={this.state.pricePerUnit}
              />
              <label htmlFor="pricePerUnit">Price Per Unit</label>{" "}
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12 m6">
              <input
                name="minQuantity"
                type="number"
                onChange={this.onChangeHandler}
                value={this.state.minQuantity}
              />
              <label htmlFor="minQuantity">Minimum quantity</label>
            </div>
            <div className="input-field col s12 m6">
              <input
                name="expiryDate"
                type="date"
                onChange={this.onChangeHandler}
                value={this.state.expiryDate}
              />
              <label htmlFor="expiryDate">Expiry date</label>
            </div>
          </div>

          <div className="row">
            <div className="col s12 m6 input-field">
              <input
                name="category"
                type="text"
                onChange={this.onChangeHandler}
                value={this.state.category}
              />
              <label htmlFor="category">Category</label>
            </div>
            <div className="col s12 m6">
              <button
                className="btn waves-effect waves-light purple darken-2"
                style={{ marginTop: "20px" }}
              >
                {this.state.itemID ? "UPDATE ITEM" : "ADD TO INVENTORY"}
              </button>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  let pathname = props.location.pathname;
  if (
    pathname !== "/admin/addToInventory" ||
    pathname !== "/admin/addToInventory/"
  ) {
    let index = Number(pathname.slice(pathname.length - 1));
    return {
      selectedItem: state.invItems[index],
      selectItemIndex: index
    };
  }
  return {
    selectedItem: null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateItem: (index, item) => {
      dispatch({ type: invAT.UPDATE_INV_ITEM, index, item });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToInventory);
