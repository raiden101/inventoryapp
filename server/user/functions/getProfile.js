const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let query = `
  select shop.shopID, shop.name as shopName, address, telephone,
  owner.name as ownerName, phoneNumber
  from shop, owner
  where shop.shopID=${req.userData.username}
  and shop.shopID = owner.shopID
  `;
  sqlConnection.query(query, (err, result) => {
    if(err)
      res.json({ error: "Error while fetching data!!" })
    else if(result.length === 0)
      res.json({ error: "No record found!!" });
    else
      res.json(result[0]);
  })
}