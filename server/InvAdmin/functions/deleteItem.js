const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let query = `
    delete from item
    where itemID = ${req.body.itemID}
  `;
  sqlConnection.query(query, (err, result) => {
    res.json({ success: err ? false : true })
  })
}