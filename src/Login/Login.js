import React, { Component } from 'react';
import MatWrapper from '../util/MatWrapper/MatWrapper';
import axios from '../util/axios';
import { saveToLocalStorage } from '../util/tokenManagement';
import { toast } from 'materialize-css';


const marginStyle = {
  marginTop: '10%'
}, paragraphStyle = {
  color: 'red',
  padding: '0px',
  marginBottom: '0px'
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginError: "",
      buttonDisabled: true
    }
  }

  setButtonState = () => {
    let { username, password } = this.state;
    this.setState({
      buttonDisabled: (username === "" || password === "")
    })
  }

  onInputHandler = e => {
    this.setState({ [e.target.name]: e.target.value },
      () => { this.setButtonState(); });
  }
   
  onSubmitHandler = e => {
    e.preventDefault();
    axios.post('/api/auth/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(({data}) => {
      if(data.error) {
        this.setState({ loginError: data.error });
      }else {
        saveToLocalStorage(data);
        toast({ html: "Login successfull!!" })
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <MatWrapper colSpec="col s12 m6 offset-m3 l4 offset-l4"
      rowSpec={{ style: marginStyle }}>
        <form 
        onSubmit={this.onSubmitHandler} 
        className="card card-panel"
        style={{padding: '10px'}}>
          <h4><center>{this.props.loginHeader}</center></h4>
          <MatWrapper colSpec="col s12 m10 offset-m1">
            <div className="input-field">
              <input 
              id="username"
              name="username" 
              type="text" 
              onChange={this.onInputHandler}/>
              <label htmlFor="username">Username</label>
            </div>
          </MatWrapper>
          <MatWrapper colSpec="input-field col s12 m10 offset-m1">
            <input 
            id="password" 
            name="password" 
            type="password"
            onChange={this.onInputHandler} />
            <label htmlFor="password">Password</label>
            <p style={paragraphStyle}>{this.state.loginError}</p>
          </MatWrapper>
          <MatWrapper colSpec="col s12 m10 offset-m1">
            <button 
            className="btn waves-effect waves-light purple darken-3"
            style={{marginTop: '-20px'}}
            disabled={this.state.buttonDisabled}>
              Login
            </button>
          </MatWrapper>

        </form>
      </MatWrapper>

    )
  }
}
