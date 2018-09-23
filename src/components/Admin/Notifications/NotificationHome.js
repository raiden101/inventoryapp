import React, { Component } from 'react'
import { Tabs } from 'materialize-css';

import axios from 'axios';
import TabContent from './TabContent';

const lowStockHeader = [
  "itemName", "pricePerUnit", "minQuantity", "quantity"
];
const expiredStockHeader = [
  "itemName", "pricePerUnit", "expiryDate", "quantity"
];
export default class NotificationHome extends Component {
  state = {
    expiredItems: [],
    lowStockItems: [],
    fetchStatus: 0,
    fetchError: "",
    isModalOpen: false
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
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

  render() {
    return (
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
          />
        </div>
        <div id="test2" className="col s12">
          <TabContent 
          header={lowStockHeader}
          items={this.state.lowStockItems}
          fetchError={this.state.fetchError}
          fetchStatus={this.state.fetchStatus}
          />
        </div>
      </div> 
    )
  }
}
