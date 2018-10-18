import React from 'react'

export default props => {
  return (

    <table style={{marginBottom: '50px'}}>
      <tbody>
        <tr>
          <th>Name</th>
          <td>{props.itemName}</td>
        </tr>
        <tr>
          <th>Brand</th>
          <td>{props.brandName}</td>
        </tr>
        <tr>
          <th>Price</th>
          <td>Rs. {props.pricePerUnit}</td>
        </tr>
        <tr>
          <th>Quantity</th>
          <td>{props.quantity} units.</td>
        </tr>
      </tbody>
    </table>

  )
}
