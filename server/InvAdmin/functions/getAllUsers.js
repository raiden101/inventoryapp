const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let q = `select O.shopID, O.name, O.phoneNumber, S.address 
  from owner O, shop S
  where O.shopID = S.shopID;`;
  sqlConnection.query(q, (err, result) => {
    if(err)
      res.json({ error: "Error while fetching users!!" });
    else
      res.json(result);
  })
}