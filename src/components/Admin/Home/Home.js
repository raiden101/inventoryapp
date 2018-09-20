import React, { Component, Fragment } from 'react';
import Navbar from '../../Navbar/Navbar';
import FeatureList from '../FeatureList/FeatureList';
import { Route } from 'react-router-dom';
import AddOwner from '../AddOwner/AddOwner';

const adminFeatures = [
  { name: "Checkout inventory", path: "/admin/home/inventory", component: AddOwner },
  { name: "Register new owner", path: "/admin/home/addNewOwner", component: AddOwner },
  { name: "Notifications", path: "/admin/home/notifications", component: AddOwner },
  { name: "Orders", path: "/admin/home/orders", component: AddOwner }
];

export default class Home extends Component {
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
              <FeatureList adminFeatures={adminFeatures}/>
            </div>
            <div className="col s12 m8">
              {myRoutes}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
