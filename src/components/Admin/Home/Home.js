import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import FeatureList from "./FeatureList";
import Navbar from "../../Navbar/Navbar";
import AddOwner from "../AddOwner/AddOwner";
import AddToInventory from '../Inventory/AddToInventory';
import InventoryItems from "../Inventory/InventoryItems";
import NotificationHome from '../Notifications/NotificationHome';
import AddNewShop from '../AddNewShop/AddNewShop';
import axios from 'axios';
import { saveToLocalStorage, getToken } from '../../../util/tokenManagement';

const adminFeatures = [
  { 
    name: "Checkout inventory", path: "/admin/inventory", component: InventoryItems
  },
  {
    name: "Add to inventory", path: "/admin/addToInventory", component: AddToInventory
  },
  {
    name: "Register new owner", path: "/admin/addNewShop", component: AddNewShop
  },
  { name: "Notifications", path: "/admin/notifications", component: NotificationHome },
  { name: "Orders", path: "/admin/orders", component: AddOwner }
], additionalRoutes = [
  {
    name: "Add to inventory",
    path: "/admin/updateItem/:id",
    component: AddToInventory
  }
];
const allRoutes = adminFeatures.concat(additionalRoutes);

class Home extends Component {
  constructor(props) {
    super(props);
    axios.interceptors.response.use(config => {
      if(config.data.auth === -1) {
        saveToLocalStorage("");
        this.props.history.replace('/admin/login');
        return null;
      }
      return config;
    })
  }

  componentDidMount() {
    axios
      .post('/api/auth/checkAuth', { token: getToken() })
      .then(data => {
        if(data.data.error) {
          this.props.history.replace('/admin/login');
          saveToLocalStorage("");
        }
      })
      .catch(err => {
        saveToLocalStorage("");
        this.props.history.replace('/admin/login');
      })
  }

  onLogout = e => {
    saveToLocalStorage("");
    this.props.history.replace('/admin/login');
  }

  render() {
    let myRoutes = allRoutes.map(feature => {
      return (
        <Route
          key={feature.name}
          path={feature.path}
          component={feature.component}
          exact
        />
      );
    });
    return (
      <Fragment>
        <Navbar  onLogout={this.onLogout}/>
        <div className="container">
          <div className="row">
            <div className="col s12 m4" style={{ paddingLeft: "0px" }}>
              <FeatureList adminFeatures={adminFeatures} />
            </div>
            <div className="col s12 m7 offset-m1">
              <Switch>
                {myRoutes}
                <Route path="/admin/updateLowStockItem"
                exact={false}
                component={AddToInventory} />
              </Switch>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;