const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let { quantity, itemID } = req.body;
  let { username: shopID } = req.userData;

  let itemInCartQuery = `select count(*) 
  from cart 
  where shopID = ${shopID} and
  itemID = ${itemID}`;

  let updateQuery = `update cart 
  set quantity = ${quantity}
  where itemID = ${itemID} and
  shopID = ${shopID}`;

  let insertQuery = `insert into cart(shopID, itemID, quantity)
  values(${shopID}, ${itemID}, ${quantity});`

  sqlConnection.query(itemInCartQuery, (err, result) => {
    if(err) {
      res.json("Ooops!! something went wrong!");
      return;
    }
    let itemCount = result[0]['count(*)'];
    let q = itemCount > 0 ? updateQuery : insertQuery;
    sqlConnection.query(q, (err, result) => {
      if(err) {
        res.json("Error while adding to cart!!");
        return;
      }
      res.json("Added to cart successfully!");
    });
  });
}
