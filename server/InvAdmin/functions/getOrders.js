const { sqlConnection } = require('../../util/sqlConn');

module.exports.getOrders = (req, res) => {
  let q = `select O.orderID, O.shopID, O.orderDate, 
  count(*) as itemCount, sum(O.quantity*I.pricePerUnit) as orderCost
  from orderList O, item I
  where O.itemID = I.itemID
  group by orderID, orderDate, shopID
  order by orderDate desc;`
  sqlConnection.query(q, (err, result) => {
    if(err) {
      res.json({ error: "Error while fetching data" });return;
    }
    res.json(result);
  })
}

module.exports.getOrderedItems = (req, res) => {
  console.log(req.body.orderID);
  let query = `select O.quantity, I.itemID, I.brandName, I.itemName,
  I.pricePerUnit, I.expiryDate
  from OrderList O, Item I
  where O.orderId = ${req.body.orderID} and
  O.itemID = I.itemID;`;
  sqlConnection.query(query, (err, result) => {
    if(err) {
      res.json({ error: "Error while fetching records!!" });return;
    }
    res.json(result);
  })
}