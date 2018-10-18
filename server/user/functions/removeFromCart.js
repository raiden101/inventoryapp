const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  const query = `delete from cart
  where itemID = ${req.params.itemID} and
  shopID = ${req.userData.username}`;
  
  sqlConnection.query(query, (err, result) => {
    res.json(err ? "Error while removing from cart!!" :
    "Successfully remove item from cart!");
  })
}