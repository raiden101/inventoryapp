import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import FeatureList from "../FeatureList/FeatureList";
import Navbar from "../../Navbar/Navbar";
import AddOwner from "../AddOwner/AddOwner";
import AddToInventory from '../Inventory/AddToInventory';
import InventoryItems from "../Inventory/InventoryItems";
import NotificationHome from '../Notifications/NotificationHome';

const adminFeatures = [
  {
    name: "Checkout inventory",
    path: "/admin/inventory",
    component: InventoryItems
  },
  {
    name: "Add to inventory",
    path: "/admin/addToInventory",
    component: AddToInventory
  },
  {
    name: "Register new owner",
    path: "/admin/addNewOwner",
    component: AddOwner
  },
  {
    name: "Notifications",
    path: "/admin/notifications",
    component: NotificationHome
  },
  { name: "Orders", path: "/admin/orders", component: AddOwner }
];

class Home extends Component {
  render() {
    let myRoutes = adminFeatures.map(feature => {
      return (
        <Route
          key={feature.name}
          path={feature.path}
          component={feature.component}
        />
      );
    });
    return (
      <Fragment>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col s12 m4" style={{ paddingLeft: "0px" }}>
              <FeatureList adminFeatures={adminFeatures} />
            </div>
            <div className="col s12 m7 offset-m1">
              <Switch>
                {myRoutes}
              </Switch>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;