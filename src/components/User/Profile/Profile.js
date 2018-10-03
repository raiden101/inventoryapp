import React, { Component } from 'react'
import axios from 'axios';

import Loader from '../../UI/Loader';

export default class Profile extends Component {
  state = {
    fetchError: "",
    info: "",
    fetching: true
  }

  componentDidMount() {
    axios
      .get('/api/user/profile')
      .then(({data}) => {
        if(data.error)
          this.setState({ fetchError: data.error, fetching: false });
        else
          this.setState({ info: data, fetching: false });
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
      let { 
        ownerName, 
        shopName, 
        address,
        telephone,
        phoneNumber
      } = this.state.info;
      toShow = (
        <div id="userProfile" className="row">
          <div className="col s12 m6">
            <h5>Owner inforamtion</h5>
            <hr />
            <h6>Name: {ownerName}</h6>
            <h6>Phone number: {phoneNumber}</h6>
          </div>
          <div className="col s12 m6">
            <h5>Shop inforamtion</h5>
            <hr />            
            <h6>Shop Name: {shopName}</h6>
            <h6>Address: {address}</h6>  
            <h6>Telephone: {telephone}</h6>
          </div>
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
