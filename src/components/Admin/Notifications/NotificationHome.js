import React, { Component } from 'react'
import { Tabs } from 'materialize-css';
import axios from '../../../util/axios';
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
    expiredItemsFetchStatus: 0,
    expiredItemsFetchError: "",
    lowStockItems: [],
    lowStockItemsFetchStatus: 0,
    lowStockItemsFetchError: ""
  }

  getExpiredItems = () => {
    // this.setState({ 
    //   expiredItemsFetchStatus: 0,
    //   expiredItemsFetchError: ""
    // })
    axios
      .get('/api/admin/getExpiredItems')
      .then(({data}) => {
        if(data.error)
          this.setState({
            expiredItemsFetchError: data.error,
            expiredItemsFetchStatus: -1
          });
        else
          this.setState({
            expiredItems: data,
            expiredItemsFetchError: "",
            expiredItemsFetchStatus: 1
          })
      })
      .catch(err => {
        this.setState({
          expiredItemsFetchError: "Ooops! something went wrong!!",
          expiredItemsFetchStatus: -1
        })
      })
  }
  getLowStockItems = () => {
    // this.setState({
    //   lowStockItemsFetchStatus: 0,
    //   lowStockItemsFetchError: ""
    // });
    axios
      .get('/api/admin/getLowStockItems')
      .then(({data}) => {
        if(data.error)
          this.setState({
            lowStockItemsFetchError: data.error,
            lowStockItemsFetchStatus: -1
          });
        else {
          this.setState({
            lowStockItems: data,
            lowStockItemsFetchError: "",
            lowStockItemsFetchStatus: 1
          })
        }
      })
      .catch(err => {
        this.setState({
          lowStockItemsFetchError: "Ooops! something went wrong!!",
          lowStockItemsFetchStatus: -1
        })
      })
  }

  componentDidMount() {
    Tabs.init(document.getElementById('notificationTabs'));
    this.getExpiredItems();
    this.getLowStockItems();
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
          fetchError={this.state.expiredItemsFetchError}
          fetchStatus={this.state.expiredItemsFetchStatus}
          />
        </div>
        <div id="test2" className="col s12">
          <TabContent 
          header={lowStockHeader}
          items={this.state.lowStockItems}
          fetchError={this.state.lowStockItemsFetchError}
          fetchStatus={this.state.lowStockItemsFetchStatus}
          />
        </div>
      </div> 
    )
  }
}
