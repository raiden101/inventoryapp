import React from 'react'

export default props => {
  let navClasses = "nav-wrapper " + props.navColor;
  return (
    <nav className={navClasses} style={{marginBottom: '35px'}}>
      <div className="container">
        <a className="brand-logo">Logo</a>
        <ul id="nav-mobile" className="right">
          <li><a onClick={props.onLogout}>Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}
