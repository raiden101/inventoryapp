import React, { Component, Fragment } from 'react'
// import searchIcon from '../../../util/a.png';
import Item from './Item';

import axios from 'axios';
export default class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      searchResult: [],
      searchString: "",
      searchError: "",
      haveSearched: false
    }
  }

  onInputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSearch = (e) => {
    this.setState({ searching: true, haveSearched: true })
    e.preventDefault();
    axios
      .get(`/api/user/searchItemByName/${this.state.searchString}`)
      .then(({data}) => {
        if(data.error) 
          this.setState({ searchError: data.error, searchResult: [] });
        else
          this.setState({ 
            searchError: "",
            searching: false, 
            searchResult: data 
          });
      })
      .catch(err => {
        this.setState({ 
          searchResult: [],
          searching: false, 
          searchError: "Ooops! somethin went wrong!!" 
        });
      })
  }
  render() {
    let btnDisabled = this.state.searchString === "" || this.state.searching;
    let searchResultJSX;
    if(!this.state.haveSearched)
      searchResultJSX = <h5 className="fade center">Start searching!!</h5>;
    else if(this.state.searchError)
      searchResultJSX = <h5 className="center">{this.state.searchError}</h5>;
    else if(this.state.searchResult.length === 0) 
      searchResultJSX = <h5 className="center">No search result!!</h5>
    else 
      searchResultJSX = (
        <div id="searchResultList">
          {this.state.searchResult.map(el => {
            return <Item {...el} key={el.itemID}/>
          })}  
        </div>
      )
      
    return (
      <Fragment>
        <form onSubmit={this.onSearch}>
          <div id="searchBar">
            <input type="text" 
            className="browser-default"
            onChange={this.onInputHandler}
            name="searchString"
            />
            <button 
            disabled={btnDisabled}
            className="btn blue lighten-3 waves-effect"
            style={{paddingRight: '28px'}}>
              search
            </button>          
          </div>
        </form>
        <div id="searchResults">
          {searchResultJSX}
        </div>
      </Fragment>
    )
  }
}
