import React from 'react'

export default props => {
  return (
    <nav className="nav-wrapper purple darken-1" style={{marginBottom: '35px'}}>
      <div className="container">
        <a className="brand-logo">Logo</a>
        <ul id="nav-mobile" className="right">
          <li><a onClick={props.onLogout}>Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}
