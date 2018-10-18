const { sqlConnection } = require('../../util/sqlConn');

// isOrder = true if order
// isOrder = false if add to cart
module.exports = isOrder => (req, res) => {
  let newItem = {
    ...req.body,
    shopID: req.userData.username
  };
  let query = isOrder ? `insert into orderList set ?` :
  `insert into cart set ?`;
  sqlConnection.query(query, newItem, (err, result) => {
    res.json(
      err ? "Error while ordering the item!!":
      "Order successfull"
    );
  })
}
