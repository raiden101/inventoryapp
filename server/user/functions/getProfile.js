const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let query = `
  select * from shop
  where shopid=${req.userData.username}
  `;
  sqlConnection.query(query, (err, result) => {
    if(result.length === 0)
      res.json({ error: "No record found!!" });
    else
      res.json(err ? { error: "Error while fetching data!!" } : result[0]);
  })
}