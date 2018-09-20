import React, { Component } from 'react';
import Login from './components/Login/Login';
import { Route, Switch } from 'react-router-dom';
import AdminHome from './components/Admin/Home/Home';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/admin/login" component={props => {
          return <Login loginHeader="Admin Login" adminFlag={1} {...props} />
        }}/>
        <Route path="/admin/home" component={AdminHome} />
      </Switch>
    );
  }
}

export default App;
