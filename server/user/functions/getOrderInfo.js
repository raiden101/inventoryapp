const { sqlConnection } = require('../../util/sqlConn');

module.exports.getOrders = (req, res) => {
  let query = `select O.orderID, O.orderDate, 
  sum(O.quantity*I.pricePerUnit) as orderCost,
  count(*) as itemCount
  from orderList O, item I
  where O.shopID = ${req.userData.username} and
  O.itemID = I.itemID
  group by O.orderID, O.orderDate;`;
  sqlConnection.query(query, (err, result) => {
    if(err) {
      res.json({ error: "Error while fetching records!" });
      return;
    }
    res.json(result);
  });
}

module.exports.getOrderedItems = (req, res) => {
  let query = `select O.quantity, I.itemID, I.brandName, I.itemName,
  I.pricePerUnit, I.expiryDate
  from OrderList O, Item I
  where O.orderId = ${req.body.orderID} and
  O.shopID = ${req.userData.username} and
  O.itemID = I.itemID;`;
  sqlConnection.query(query, (err, result) => {
    if(err) {
      res.json({ error: "Error while fetching records!!" });return;
    }
    res.json(result);
  })
}