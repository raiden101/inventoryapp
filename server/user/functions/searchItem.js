const { sqlConnection } = require('../../util/sqlConn');

module.exports.searchByName = (req, res) => {
  let query = `
  select itemName, pricePerUnit, brandName, itemID
  from item
  where itemName like '%${req.params.itemName}%' and quantity > 0;
  `;
  sqlConnection.query(query, (err, result) => {
    res.json(err ? { error: "Error while fetching!!" } : result);
  })
}

module.exports.searchById = (req, res) => {
  let query = `
  select itemName, pricePerUnit, quantity, 
  brandName, category, expiryDate, itemID
  from item
  where itemID = ${req.params.itemID};
  `;
  sqlConnection.query(query, (err, result) => {
    res.json(err ? { error: "Error while fetching!!" } : result[0]);
  })
}

