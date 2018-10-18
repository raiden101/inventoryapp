const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let query = `select I.itemID, I.pricePerUnit*C.quantity as totalPrice,
  I.itemName, C.quantity, I.pricePerUnit, I.brandName,
  I.quantity >= C.quantity as available
  from cart C, item I
  where C.itemID = I.itemID and
  shopID = ${req.userData.username}`;

  sqlConnection.query(query, (err, result) => {
    res.json(
      err ?
      { error: "Error while fetching!!" } :
      { data: result }
    );
  })
} 