import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import axios from 'axios';

import Loader from '../UI/Loader';
import FeatureList from "../UI/FeatureList";
import Navbar from "../UI/Navbar";
import AddToInventory from './Inventory/AddToInventory';
import InventoryItems from "./Inventory/InventoryItems";
import NotificationHome from './Notifications/NotificationHome';
import AddNewShop from './AddNewShop/AddNewShop';
import Orders from './Orders/Orders';
import ViewOrder from '../UI/common/ViewOrder';
import { saveToLocalStorage, getToken, tokenExists } from '../../util/tokenManagement';

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
  { name: "Orders", path: "/admin/orders", component: Orders }
], additionalRoutes = [
  {
    name: "add to inv",
    path: "/admin/updateItem/:id",
    component: AddToInventory
  },
  { 
    name: "view order",
    path: "/admin/viewOrder/:orderID",
    component: ViewOrder
  }
];
const allRoutes = adminFeatures.concat(additionalRoutes);

class Home extends Component {
  constructor(props) {
    super(props);
    axios.interceptors.response.use(config => {
      if(config.data.auth === -1) {
        saveToLocalStorage("");
        this.props.history.replace('/login');
        return null;
      }
      return config;
    })
  }

  redirectToLogin() {
    this.props.history.replace('/login');
  }

  state = {
    auth: false
  }

  componentDidMount() {
    if(this.props.location.auth === true)
      this.setState({ auth: true });
    else if(tokenExists()) {
      axios
        .post('/api/auth/checkAuth', { token: getToken() })
        .then(({data}) => {
          if(data.error || data.adminFlag === 0) {
            saveToLocalStorage("");
            this.redirectToLogin();
          }else 
            this.setState({ auth: true })
        })
        .catch(err => {
          saveToLocalStorage("");
          this.redirectToLogin();
        })
    }else
      this.redirectToLogin();
  }

  onLogout = e => {
    saveToLocalStorage("");
    this.props.history.replace('/admin/login');
  }

  render() {
    if(this.state.auth) {
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
          <Navbar
          navColor="purple darken-1" 
          onLogout={this.onLogout}/>
          <div className="container">
            <div className="row">
              <div className="col s12 m4" 
              style={{ paddingLeft: "0px", marginBottom: '25px' }}>
                <FeatureList 
                fontColor="purple-text darken-2"
                features={adminFeatures} />
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
    return <center className="centerOfPage"><Loader /></center>
  }
}

export default Home;