const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let query = `insert into shop set ?`;
  sqlConnection.query(query, req.body, (err, result) => {
    res.json(err ? 
      { msg: "Error while uploading. Try a different shopId", success: false } : 
      { msg: "Successfully added to db!", success: true }
    );
  })
}