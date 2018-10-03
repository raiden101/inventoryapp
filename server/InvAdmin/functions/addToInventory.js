const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let query = `insert into item SET ?`;
  sqlConnection.query(query, req.body, (err, result) => {
    if(err)
      res.json("Error while adding item to database");
    else 
      res.json("Successfully added item to db!");
  })
}