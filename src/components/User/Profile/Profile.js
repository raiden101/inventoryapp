import React, { Component } from 'react'
import axios from 'axios';

import Loader from '../../UI/Loader';

export default class Profile extends Component {
  state = {
    fetchError: "",
    profileInfo: "",
    fetching: true
  }

  componentDidMount() {
    axios
      .get('/api/user/profile')
      .then(({data}) => {
        if(data.error)
          this.setState({ fetchError: data.error, fetching: false });
        else
          this.setState({ profileInfo: data, fetching: false });
      })
      .catch(err => {
        this.setState({ fetchError: "Oops!! somthing went wrong!", fetching: false });
      });
  }
  
  render() {
    let toShow;
    if(this.state.fetching) {
      toShow = <center><Loader color="blue" /></center>
    }else if(this.state.fetchError) {
      toShow = <h5>{this.state.fetchError}</h5>
    }else {
      let { shopid, name, ownerName, address } = this.state.profileInfo;
      toShow = (
        <div id="userProfile">
          <h5>Your Profile</h5>
          <h6>Shop ID: {shopid}</h6>
          <h6>Shop Name: {name}</h6>
          <h6>Shop Owner: {ownerName}</h6>
          <h6>address: {address}</h6>
        </div>
      );
    }
    return (
      <div>
        {toShow}
      </div>
    )
  }
}
