import React, { Component, Fragment } from "react";
import { toast } from "materialize-css";
import { connect } from "react-redux";
import qs from 'querystring';

import axios from "axios";
import * as invAT from "../../../actionTypes/inventory";

const redirectPath = "/admin/inventory";

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

  onDeleteHandler = e => {
    axios
      .post("/api/admin/deleteInventoryItem", {
        itemID: this.props.selectedItem.itemID
      })
      .then(({ data }) => {
        let s = data.success;
        toast({ html: s ? "Deletion successfull" : "Error while deleting!" });
        if (s) this.props.deleteItem(this.props.selectItemIndex);
        this.props.history.push(redirectPath);
      })
      .catch(err => {
        toast({ html: "Oops something went wrong!" });
        this.props.history.push(redirectPath);
      });
  };

  addItemHandler = e => {
    let {
      itemName, pricePerUnit, quantity,
      brandName, category,
      minQuantity, expiryDate
    } = this.state;
    let newitem = {
      itemName, pricePerUnit, quantity, brandName,
      category, minQuantity, expiryDate
    };
    axios
      .post("/api/admin/addToInventory", newitem)
      .then(({ data }) => {
        toast({ html: `${data}` });
      })
      .catch(err => {
        toast({ html: "Oops! somthing went wrong!!" });
      });
  }

  updateItemHandler = e => {
    let {
      itemName, pricePerUnit, quantity,
      brandName, category,
      minQuantity, expiryDate, itemID
    } = this.state;
    let newitem = {
      itemName, pricePerUnit, quantity, brandName,
      category, minQuantity, expiryDate, itemID
    };
    axios
      .post("/api/admin/updateInventoryItem", newitem)
      .then(({ data }) => {
        if(data.error) {
          toast({ html: `${data.error}` });
        }else {
          toast({ html: `${data}` });
          this.props.updateItem(this.props.selectItemIndex, newitem);
          this.props.history.push(redirectPath);
        }
      })
      .catch(err => {
        toast({ html: "Oops! somthing went wrong!!" });
        this.props.history.push(redirectPath);
      });
  }
  
  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Fragment>
        <h5 className="noMargin">Fill the details..</h5>
        <form>
          <div className="row">
            <div className="input-field col s12 m6">
              <input
                name="itemName"
                type="text"
                onChange={this.onChangeHandler}
                value={this.state.itemName}
              />
              <label htmlFor="itemName"
              className={this.state.itemName===""?"":"active"}>Item name</label>
            </div>
            <div className="input-field col s12 m6">
              <input
                name="quantity"
                type="number"
                onChange={this.onChangeHandler}
                value={this.state.quantity}
              />
              <label htmlFor="quantity"
              className={this.state.quantity===""?"":"active"}>Quantity</label>
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
              <label htmlFor="brandName"
              className={this.state.brandName===""?"":"active"}>Brand name</label>
            </div>
            <div className="input-field col s12 m6">
              <input
                name="pricePerUnit"
                type="number"
                onChange={this.onChangeHandler}
                value={this.state.pricePerUnit}
              />
              <label htmlFor="pricePerUnit"
              className={this.state.pricePerUnit===""?"":"active"}>Price Per Unit</label>{" "}
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
              <label htmlFor="minQuantity"
              className={this.state.minQuantity===""?"":"active"}>Minimum quantity</label>
            </div>
            <div className="input-field col s12 m6">
              <input
                name="expiryDate"
                type="date"
                onChange={this.onChangeHandler}
                value={this.state.expiryDate}
              />
              <label htmlFor="expiryDate"
              className={this.state.expiryDate===""?"":"active"}>Expiry date</label>
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
              <label htmlFor="category"
              className={this.state.category===""?"":"active"}>Category</label>
            </div>
            <div className="col s12 m6" style={{ marginTop: "20px" }}>
              <div className="col s6">
                {
                  this.props.selectedItem ? (
                    <button 
                    className="btn waves-effect waves-light purple darken-2"
                    type="button"
                    onClick={this.updateItemHandler}>
                      {"UPDATE ITEM"}
                    </button>
                  ):(
                    <button 
                    className="btn waves-effect waves-light purple darken-2"
                    type="button"
                    onClick={this.addItemHandler}>
                      {"ADD ITEM"}
                    </button>
                  )
                }
              </div>
              <div className="col s6">
                {
                  this.props.selectedItem ? (
                    <button
                      type="button"
                      onClick={this.onDeleteHandler}
                      style={{ marginLeft: "10px" }}
                      className="btn waves-effect waves-light red darken-3"
                    >
                      Delete item
                    </button>
                  ) : null
                }
              </div>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  let id = props.match.params.id;
  let pathname = props.location.pathname;
  if(id) {
    let index = Number(id);
    return {
      selectedItem: state.invItems[index],
      selectItemIndex: index
    };
  }else if(pathname.match(/lowstock/i)) {
    let item = qs.parse(props.location.search.slice(1)); 
    let id = Number(item.itemID);
    return {
      selectedItem: {
        itemName: item.in, quantity: item.qn, pricePerUnit: item.ppu,
        minQuantity: item.mq, expiryDate: item.d, category: item.cat,
        brandName: item.bn, itemID: item.id
      },
      selectedItemIndex: state.invItems.findIndex((el, index) => {
        return el.itemID === id;
      })
    }
  }else 
    return { selectedItem: null };
};

const mapDispatchToProps = dispatch => {
  return {
    updateItem: (index, item) => {
      dispatch({ type: invAT.UPDATE_INV_ITEM, index, item });
    },
    deleteItem: index => {
      dispatch({ type: invAT.DELETE_INV_ITEM, index });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToInventory);
