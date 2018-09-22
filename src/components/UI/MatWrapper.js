import React from 'react';

export default (props) => (
  <div className="row" {...props.rowSpec}>
    <div className={props.colSpec}>
      {props.children}
    </div>
  </div>
)
