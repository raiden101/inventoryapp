const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let query = `
    delete from inventory
    where itemId = ${req.body.itemID}
  `;
  sqlConnection.query(query, (err, result) => {
    res.json({ success: err ? false : true })
  })
}