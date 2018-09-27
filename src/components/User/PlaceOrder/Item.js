import React from 'react'
import './item.css';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <Link 
    to= {`/user/orderItem/${props.itemID}`}>
      <div className="item">
        <div>
          <h5 className="noMargin noPadding">
            Brand : <span>{props.brandName}</span>
          </h5>
          <h5 className="noMargin noPadding">
            Name : <span>{props.itemName}</span>
          </h5>
        </div>
        <h6 className="noMaring noPadding">
          Rs.{props.pricePerUnit}/-
        </h6>
      </div>
    </Link>
    
  )
}
