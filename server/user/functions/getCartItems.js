const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let query = `select I.itemID, I.pricePerUnit*C.quantity as totalPrice,
  I.itemName, C.quantity, I.pricePerUnit, I.brandName,
  I.quantity >= C.quantity as available
  from cart C, item I
  where C.itemID = I.itemID and
  shopID = ${req.userData.username}`;

  let cartCostQuery = `select sum(cart.quantity*item.pricePerUnit) as tot
  from cart, item
  where cart.itemID = item.itemID
  and item.quantity >= cart.quantity
  and shopID=${req.userData.username}`

  sqlConnection.query(query, (err, result1) => {
    if(err) {
      res.json({ error: "Error while fetching!!" });
      return;
    }
    sqlConnection.query(cartCostQuery, (err, result2) => {
      if(err) {
        res.json({ error: "Error while fetching!!" });
        return;
      }
      let temp = result2[0]['tot'];
      res.json({ cartItems: result1, totalCost: (temp === null) ? 0 : temp });
    });
  })
} 