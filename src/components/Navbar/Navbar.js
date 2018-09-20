import React from 'react'

export default () => {
  return (
    <nav className="nav-wrapper purple darken-1" style={{marginBottom: '35px'}}>
      <div className="container">
        <a className="brand-logo">Logo</a>
        <ul id="nav-mobile" className="right">
          <li><a>Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}
