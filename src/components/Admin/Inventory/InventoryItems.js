import React, { Component, Fragment } from "react";
import axios from "axios";
import MatWrapper from "../../UI/MatWrapper";
import { connect } from 'react-redux';
import * as invAT from '../../../actionTypes/inventory';

const tableHeaders = [
  "Item Name",
  "Quantity",
  "Brand Name",
  "Price Per Unit",
  "Category",
  "Expiry Date"
];

class InventoryItems extends Component {
  formattedDate = d => {
    let temp = new Date(d);
    return `${temp.getDate()}/${temp.getMonth() + 1}/${temp.getFullYear()}`;
  };

  onDoubleClickHandler = e => {
    this.props.history.push(
      `/admin/addToInventory/${e.target.parentElement.dataset.index}`
    );
  };

  getInventoryItems = () => {
    this.props.startFetching();
    let invLen = this.props.invItems.length;
    let begID = (invLen === 0) ? 1 : this.props.invItems[invLen-1].itemID + 1;
    axios
      .post("/api/admin/getInventoryItems", {
        itemIDStartingFrom: begID
      })
      .then(({ data }) => {
        if (data.error)
          this.props.failureFetching(data.error);
        else 
          this.props.successFetching(data);
      })
      .catch(err => {
        this.props.failureFetching("Ooops!!something went wrong!");        
      });
  };

  loadMoreClickedHandler = () => {
    this.getInventoryItems();
  };

  componentDidMount() {
    if(this.props.invItems.length === 0)
      this.getInventoryItems();
  }

  render() {
    let table = null;
    let { fetchStatus } = this.props;
    if (fetchStatus === 1) {
      table = (
        <table className="highlight responsive-table">
          <thead>
            <tr>
              {tableHeaders.map((el, index) => {
                return <th key={index}>{el}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.invItems.map((el,index) => (
              <tr
                key={el.itemID}
                data-index={index}
                onDoubleClick={this.onDoubleClickHandler}
              >
                <td>{el.itemName}</td>
                <td>{el.quantity}</td>
                <td>{el.brandName}</td>
                <td>{el.pricePerUnit}</td>
                <td>{el.category}</td>
                <td>{this.formattedDate(el.expiryDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (fetchStatus === 0) {
      table = (
        <center>
          <div className="preloader-wrapper active small">
            <div className="spinner-layer spinner-yellow-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </center>
      );
    } else {
      table = <h6 className="center">{this.props.fetchError}</h6>;
    }
    return (
      <Fragment>
        <MatWrapper>{table}</MatWrapper>
        <MatWrapper colSpec="col s12 center">
          <button
            onClick={this.loadMoreClickedHandler}
            className="btn waves-effect waves-light grey lighten-1"
          >
            Load More items
          </button>
        </MatWrapper>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    invItems: state.invItems,
    fetchError: state.invItemsFetchError,
    fetchStatus: state.invItemsFetchStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startFetching: () => { dispatch({ type: invAT.START_FETCHING_INV_ITEMS }) },
    successFetching: items => { dispatch({ type: invAT.SUCCESS_FETCHING_INV_ITEMS, invItems: items }) },
    failureFetching: err => { dispatch({ type: invAT.FAILURE_FETCHING_INV_ITEMS, error: err }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryItems);