import React, { Component } from 'react';
import Login from './components/Login/Login';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminHome from './components/Admin/Admin';
import User from './components/User/User';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login/admin" component={props => {
          return <Login 
          loginHeader="Admin Login" 
          adminFlag={1} 
          successRoute="/admin/inventory"
          {...props} />
        }}/>
        <Route path="/admin" component={AdminHome} />
        <Route path="/login" component={props => {
          return <Login 
          loginHeader="Login" 
          adminFlag={0} 
          successRoute="/user"
          {...props} />
        }} />
        <Route path="/user" component={User}/>
        <Redirect from="/" to="/login" />
      </Switch>
    );
  }
}

export default App;
