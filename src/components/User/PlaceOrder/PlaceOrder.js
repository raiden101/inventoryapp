import React, { Component, Fragment } from 'react'
import axios from 'axios';

import Item from './Item';
import Loader from '../../UI/Loader';

export default class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: true,
      searchResult: [],
      searchString: "",
      searchError: "",
      haveSearched: false
    }
  }

  componentDidMount() {
    axios
      .get('/api/user/getLikedItems')
      .then(({data}) => {
        if(data.error)
          this.setState({ searching: false, searchError: data.error })
        else
          this.setState({ searchResult: data, searching: false })
      })
      .catch(err => {
        this.setState({ 
          searchError: "Ooops!!something went wrong!!", searching: false 
        })
      })
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
    
    if(this.state.searching)
      searchResultJSX = (<center><Loader color="blue"/></center>);
    else if(this.state.searchError)
      searchResultJSX = <h5 className="center">{this.state.searchError}</h5>;
    else if(this.state.searchResult) {
      let l = this.state.searchResult.length;
      if(l === 0)
        searchResultJSX = (<h5 className="center">
          {this.state.haveSearched ? "No search result!!" : 
          "......"}
        </h5>);
      else
        searchResultJSX = (
          <div id="searchResultList">
            {this.state.searchResult.map(el => {
              return <Item {...el} key={el.itemID}/>
            })}  
          </div>
        )
    }
     
    // if(!this.state.haveSearched)
    //   searchResultJSX = <h5 className="fade center">Start searching!!</h5>;
    // else if(this.state.searchError)
    //   searchResultJSX = <h5 className="center">{this.state.searchError}</h5>;
    // else if(this.state.searching)
    //   searchResultJSX = <center><Loader color="blue"/></center>
    // else if(!this.state.searching && this.state.searchResult.length === 0) 
    //   searchResultJSX = <h5 className="center">No search result!!</h5>
    // else 
    //   searchResultJSX = (
    //     <div id="searchResultList">
    //       {this.state.searchResult.map(el => {
    //         return <Item {...el} key={el.itemID}/>
    //       })}  
    //     </div>
    //   )
    let msg = !this.state.haveSearched && this.state.searchResult.length>0 ? 
    (<h6>Things you may like...</h6>) : null;
    return (
      <Fragment>
        <form onSubmit={this.onSearch} style={{margin: '15px 0px 20px 0px'}}>
          <div id="searchBar">
            <input type="text" 
            className="browser-default"
            onChange={this.onInputHandler}
            name="searchString"
            />
            <button 
            disabled={btnDisabled}
            className="btn blue lighten-3 waves-effect"
            style={{padding: '0px 30px'}}>
              <i className="fa fa-search fa-xs"></i>  
            </button>          
          </div>
        </form>
        {msg}
        <div id="searchResults">
          {searchResultJSX}
        </div>
      </Fragment>
    )
  }
}
