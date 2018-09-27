const { sqlConnection } = require('../../util/sqlConn');

module.exports.searchByName = (req, res) => {
  let query = `
  select itemName, pricePerUnit, brandName, itemID
  from inventory
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
  from inventory
  where itemID = ${req.params.itemID};
  `;
  sqlConnection.query(query, (err, result) => {
    res.json(err ? { error: "Error while fetching!!" } : result[0]);
  })
}

