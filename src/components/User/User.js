import React, { Component, Fragment } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";

import {
  getToken,
  tokenExists,
  saveToLocalStorage
} from "../../util/tokenManagement";
import Loader from "../UI/Loader";
import Navbar from "../UI/Navbar";
import FeatureList from "../UI/FeatureList";
import Profile from "./Profile/Profile";
import PlaceOrder from "./PlaceOrder/PlaceOrder";
import MyOrders from "./MyOrders/MyOrders";
import OrderItem from './OrderItem/OrderItem';

const userFeatures = [
  { path: "/user/placeOrder", component: PlaceOrder, name: "New Order" },
  { path: "/user/profile", component: Profile, name: "My Profile" },
  { path: "/user/myOrders", component: MyOrders, name: "My Orders" }
];

const additionalRoutes = [
  { path: "/user/orderItem/:itemID", component: OrderItem }
];

export default class User extends Component {
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
    this.state = {
      auth: false
    };
  }

  onLogout = () => {
    saveToLocalStorage(null);
    this.redirectToLogin();
  };

  redirectToLogin() {
    this.props.history.replace("/login");
  }

  componentDidMount() {
    if (this.props.location.auth) this.setState({ auth: true });
    else if (tokenExists()) {
      axios
        .post("/api/auth/checkAuth", { token: getToken() })
        .then(({ data }) => {
          if (data.error || data.adminFlag === 1) this.redirectToLogin();
          else this.setState({ auth: true });
        })
        .catch(err => {
          this.redirectToLogin();
        });
    } else this.redirectToLogin();
  }

  render() {
    let toShow, welcomeMessage = null;
    let { pathname } = this.props.location;
    if (this.state.auth) {
      if(pathname === '/user' || pathname === '/user/') {
        welcomeMessage = (
          <div className="valign">
            <h5 className="fade"><center>Hello User</center></h5>
            <h4 className="fade"><center>Select an option in the menu to get started.</center></h4>                  
          </div>
        );
      }
      let routes = userFeatures.concat(additionalRoutes).map((el, index) => (
        <Route 
        key={index}
        path={el.path} 
        component={el.component} />
      ));
      toShow = (
        <Fragment>
          <Navbar onLogout={this.onLogout} navColor="blue lighten-3" />
          <div className="container">
            <div className="row">
              <div className="col s12 m8">
                <Switch>{routes}</Switch>
                {welcomeMessage}
              </div>
              <div className="col s12 m4">
                <FeatureList
                  fontColor="blue-text lighten-4"
                  features={userFeatures}
                />
              </div>
            </div>
          </div>
        </Fragment>
      );
    } else
      toShow = (
        <center className="centerOfPage">
          <Loader />
        </center>
      );

    return <div>{toShow}</div>;
  }
}
