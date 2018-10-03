import React, { Component, Fragment } from 'react'
import { Tabs, toast } from 'materialize-css';
import axios from 'axios';
import { connect } from 'react-redux';

import TabContent from './TabContent';
import Modal from '../../UI/Modal';
import * as AT from '../../../actionTypes/inventory';

const lowStockHeader = [
  "itemName", "pricePerUnit", "minQuantity", "quantity"
];
const expiredStockHeader = [
  "itemName", "pricePerUnit", "expiryDate", "quantity"
];
class NotificationHome extends Component {
  state = {
    expiredItems: [],
    lowStockItems: [],
    fetchStatus: 0,
    fetchError: "",
    modalOpen: false,
    modalDataIndex: -1
  }

  onRowClicked = index => {
    this.setState({ modalDataIndex: index, modalOpen: true });
  }

  onExpiredItemClick = index => {
    this.setState({ modalData: this.state.expiredItems[index]  });
  }

  removeExpiredItem = () => {
    let copy = [...this.state.expiredItems];
    copy.splice(this.state.modalDataIndex, 1);
    this.setState({ expiredItems: copy });
  }

  unmounted = false;
  componentDidMount() {
    this.unmounted = false;
    Tabs.init(document.getElementById('notificationTabs'));
    axios.get('/api/admin/getNotifications')
    .then(({data}) => {
      if(data.error)
        !this.unmounted && this.setState({ fetchStatus: -1, fetchError: data.error })
      else
        !this.unmounted && this.setState({ 
          expiredItems: data[0], 
          lowStockItems: data[1],
          fetchStatus: 1,
          fetchError: ""
        })
    })
    .catch(err => {
      !this.unmounted && this.setState({ fetchStatus: -1, fetchError: "Oops! something went wrong!!" });
    })
  }
  
  componentWillUnmount() {
    this.unmounted = true;
  }

  onAgree = () => {
    let item = this.state.expiredItems[this.state.modalDataIndex];
    if(item)
      axios
        .post('/api/admin/deleteInventoryItem', {
          itemID: item.itemID 
        })
        .then(({data}) => {
          if(data.success) {
            toast({ html: "Deletion successfull" })
            this.removeExpiredItem();
            this.props.deleteInvItem();
            this.setState({ modalDataIndex: -1 });
          }else
            toast({ html: "Error while deleting" })
        })
        .catch(err => {
          toast({ html: "Ooops!! something went wrong!" });
        })
    
    this.setState({ modalOpen: false })
  }

  onDisagree = () => {
    this.setState({ modalOpen: false })
  }

  onLowStockItemClicked = index => {
    let item = this.state.lowStockItems[index];
    let queryString = `?in=${item.itemName}&qn=${item.quantity}&id=${item.itemID}&bn=${item.brandName}&ppu=${item.pricePerUnit}&mq=${item.minQuantity}&d=${item.expiryDate}&cat=${item.category}`
    this.props.history.push('/admin/updateLowStockItem' + queryString);
  }

  render() {
    return (
      <Fragment>
        <Modal 
        modalID="expiredItem"
        onAgree={this.onAgree}
        onDisagree={this.onDisagree}
        item={this.state.expiredItems[this.state.modalDataIndex]}
        open={this.state.modalOpen}/>
        <div className="row">
          <div className="col s12" style={{marginBottom: '15px'}}>
            <ul className="tabs purple-text" id="notificationTabs">
              <li className="tab col s3">
                <a href="#test1">Expired Items</a>
              </li>
              <li className="tab col s3">
                <a href="#test2">Low Stock</a>
              </li>
            </ul>
          </div>
          <div id="test1" className="col s12">
            <TabContent 
            header={expiredStockHeader}
            items={this.state.expiredItems}
            fetchError={this.state.fetchError}
            fetchStatus={this.state.fetchStatus}
            onRowClicked={this.onRowClicked}
            />
          </div>
          <div id="test2" className="col s12">
            <TabContent 
            header={lowStockHeader}
            items={this.state.lowStockItems}
            fetchError={this.state.fetchError}
            fetchStatus={this.state.fetchStatus}
            onRowClicked={this.onLowStockItemClicked}
            />
          </div>
        </div> 
      </Fragment>
     
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteInvItem: index => { 
      dispatch({ type: AT.DELETE_INV_ITEM, index: index  }) 
    }
  }
}
export default connect(null, mapDispatchToProps)(NotificationHome);