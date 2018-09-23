import React, { Component } from 'react'
import MatWrapper from '../../UI/MatWrapper';
import axios from 'axios';
import { toast } from 'materialize-css';

export default class AddNewShop extends Component {
  state = {
    shopid: "",
    name: "",
    ownerName: "",
    address: ""
  }
  onSubmitHandler = e => {
    e.preventDefault();
    let data = {...this.state, password: this.state.shopid}
    axios
      .post('/api/admin/addNewShop', data)
      .then(({data}) => {
        toast({ html: `${data.msg}` });
        if(data.success)
          this.setState({ shopid: "", name: "", ownerName: "", address: "" });
      })
      .catch(err => {
        toast({ html: "Ooops!! something went wrong" });
      })
  }
  onInputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <MatWrapper colSpec="col s12">
        <form onSubmit={this.onSubmitHandler}>
          <h5 className="noMargin noPadding">Enter shop details.</h5>
          <div className="row">
            <div className="col s12 m6 input-field">
              <input type="text" name="shopid"
              value={this.state.shopid} 
              onChange={this.onInputHandler} />
              <label htmlFor="shopid">Shop id</label>
            </div>
            <div className="col s12 m6 input-field">
              <input type="text" name="name"
              value={this.state.name}
              onChange={this.onInputHandler} />
              <label htmlFor="name">Shop name</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m6 input-field">
              <input type="text" name="ownerName"
              value={this.state.ownerName} 
              onChange={this.onInputHandler} />
              <label htmlFor="ownerName">Owner Name</label>
            </div>
            <div className="col s12 m6 input-field">
              <input type="text" name="address" 
              value={this.state.address}
              onChange={this.onInputHandler} />
              <label htmlFor="address">Address</label>
            </div>
          </div>
          <MatWrapper colSpec="col s12">
            <button className="btn waves-effect waves-light purple darken-3">
              Done
            </button>
          </MatWrapper>
        </form>
      </MatWrapper>      
    )
  }
}
