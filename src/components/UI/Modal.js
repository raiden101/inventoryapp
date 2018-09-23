import React, { Component } from "react";
import { Modal } from 'materialize-css';

export default class extends Component {
  state = {
    inst: null,
    item: null
  }

  componentWillReceiveProps(props) {
    if(this.state.inst && props.open) {
      this.state.inst.open();
      this.setState({
        item: props.item
      })
    }
  }

  shouldComponentUpdate(props) {
    return props.open ? true : false;
  }

  componentDidMount() {
    let currModal = document.querySelector(`#${this.props.modalID}`);
    Modal.init(currModal);
    this.setState({ inst: Modal.getInstance(currModal) })
  }

  closeModal = flag => {
    this.state.inst.close();
    if(flag) this.props.onAgree()
    else this.props.onDisagree();
  }

  render() {
    let itemInfo = null;
    if(this.state.item) {
      let { item } = this.state;
      itemInfo = (
        <div>
          <h6>Item name:  {item.itemName}</h6>
          <h6>Price per unit:  {item.pricePerUnit}</h6>
          <h6>Expiry date:  {item.expiryDate}</h6>
          <h6>Quantity:  {item.quantity}</h6>
        </div>
      )
    }
    
    return (
      <div id={this.props.modalID} className="modal">
        <div className="modal-content">
          <h4>Delete this item?</h4>
          {itemInfo}
        </div>
        <div className="modal-footer">
          <button
            onClick={this.closeModal.bind(this, true)}
            className="modal-close waves-effect waves-green btn-flat">
            Yes
          </button>
          <button
            onClick={this.closeModal.bind(this, false)}
            className="modal-close waves-effect waves-green btn-flat">
            No
          </button>
        </div>
      </div>
    );
  }
}
