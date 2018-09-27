import React, { Component } from 'react'
import axios from 'axios';
import Loader from '../../UI/Loader';

export default class OrderItem extends Component {
  state = {
    loading: true
  }
  componentDidMount() {
    axios.get(`/api/user/searchByID/${this.props.match.params.itemID}`)
    .then(console.log)
    .catch(console.log);
  }


  render() {
    return (
      <div>
        <h5>heyy</h5>
      </div>
    )
  }
}
