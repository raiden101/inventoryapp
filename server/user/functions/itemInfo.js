const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  // checking if item is der in the cart of the user
  // getting all item info.
  let itemID = req.params.itemID;
  let p1 = new Promise((resolve, reject) => {
    let quantityOfItemInCart = `
    select quantity
    from cart
    where itemID = ${itemID}
    and shopID = ${req.userData.username}`;
    sqlConnection.query(quantityOfItemInCart, (err, result) => {
      if(err)
        reject("Error while fetching data!!");
      else
        resolve(result[0]);
    });
  });
  let p2 = new Promise((resolve, reject) => {
    let query = `
    select itemName, pricePerUnit, quantity, 
    brandName, category, expiryDate, itemID
    from item
    where itemID = ${itemID};
    `;
    sqlConnection.query(query, (err, result) => {
      if(err)
        reject("Error while fetching data!!");
      else
        resolve(result[0]);    
    })
  });
  Promise.all([p1, p2])
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.json({ error: err });
  })
  
}