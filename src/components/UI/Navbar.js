import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Sidenav } from "materialize-css";

export default class Navbar extends Component {
  state = {
    inst: null
  }
  componentDidMount() {
    if (this.props.mobileLinks) {
      let nav = document.querySelector(".sidenav");
      Sidenav.init(nav);
      this.setState({ inst: Sidenav.getInstance(nav) });
    }
  }

  closeNav = () => {
    if(this.state.inst !== null)
      this.state.inst.close();
  }
  render() {
    let navClasses = "nav-wrapper " + this.props.navColor;
    let mobile = null;
    if (this.props.mobileLinks) {
      mobile = (
        <ul className="sidenav" id="mobileNav" onClick={this.closeNav}>
          <li style={{marginTop: '10px'}}>
            <Link to={this.props.brandLogoRedirect}>
              <center>
                <i
                  className="fa fa-shopping-cart"
                  style={{ fontSize: "20px", marginRight: "10px" }}
                >
                  {" "}
                  The Sho:P
                </i>
              </center>
            </Link>
          </li>
          {this.props.mobileLinks.map(el => {
            return (
              <li key={el.path}>
                <Link to={el.path}>{el.name}</Link>
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <Fragment>
        <nav className={navClasses} style={{ marginBottom: "35px" }}>
          <div className="container">
            <Link className="brand-logo" to={this.props.brandLogoRedirect}>
              <i
                className="fa fa-shopping-cart"
                style={{ fontSize: "0.8em", marginTop: "16px" }}
              >
                {" "}
                The Sho:P
              </i>
            </Link>
            <a data-target="mobileNav" className="sidenav-trigger">
              <i className="fa fa-bars" />
            </a>
            <ul id="nav-mobile" className="right">
              <li>
                <a onClick={this.props.onLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </nav>
        {mobile}
      </Fragment>
    );
  }
}
