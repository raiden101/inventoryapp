const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let query = `
  select * 
  from item
  where itemID >= ${req.body.itemIDStartingFrom}
  limit 3
  `;
  sqlConnection.query(query, (err, result) => {
    if(err) 
      res.json({ error: "Error while fetching data!!" });
    else
      res.json(result);
  })

}