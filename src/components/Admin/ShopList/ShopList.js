import React, { Component } from "react";
import axios from "axios";

import Loader from '../../UI/Loader';

export default class ShopList extends Component {
  state = {
    loading: true,
    userList: [],
    fetchError: ""
  };

  componentDidMount() {
    axios
      .get("/api/admin/getAllUsers")
      .then(({ data }) => {
        if (data.error)
          this.setState({
            fetchError: data.error,
            loading: false,
            userList: []
          });
        else this.setState({ userList: data, loading: false, fetchError: "" });
      })
      .catch(err => {
        this.setState({
          fetchError: "Oops!something went wrong!",
          loading: false
        });
      });
  }
  render() {
    let toShow = null;
    if (this.state.userList.length > 0) {
      toShow = (
        <table className="striped responsive-table">
          <thead>
            <tr>
              <th>Shop ID</th>
              <th>Owner name</th>
              <th>Phone number</th>
              <th>Shop address</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userList.map(user => {
              return (
                <tr key={user.shopID}>
                  <td>{user.shopID}</td>
                  <td>{user.name}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.address}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      );
    } else if (this.state.loading)
      toShow = (
        <center>
          <Loader color="blue" />
        </center>
      );
    else if (this.state.fetchError)
      toShow = (
        <center>
          <p>{this.state.fetchError}</p>
        </center>
      );
    return toShow;
  }
}
