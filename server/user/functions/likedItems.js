const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let q = `
    select *
    from item
    where category in(
      select category
      from itemk
      where itemID in(
        select distinct itemID
        from orderList 
        where shopID=${req.userData.username}
      )
    ) limit 8;
  `;
  sqlConnection.query(q, (err, result) => {
    if(err)
      res.json({ error: "Error while fetching items!!" });
    else
      res.json(result);
  })
}