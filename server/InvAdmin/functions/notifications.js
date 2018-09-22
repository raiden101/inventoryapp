const { sqlConnection } = require('../../util/sqlConn');

const sqlDate = temp => {
  let month = temp.getMonth()+1, date = temp.getDate();
  if(month < 10)  month = `0${month}`;
  if(date < 10)  date = `0${date}`
  return `${temp.getFullYear()}-${month}-${date}`;
};

const userDate = temp => {
  let d = new Date(temp);
  return `${d.getDate()}/${d.getMonth()+1}/${temp.getFullYear()}`
}

const getLowStockItems = (req, res) => {
  let query = `
    select itemName, pricePerUnit, minQuantity, quantity
    from inventory
    where quantity <= minQuantity
  `;
  sqlConnection.query(query, (err, result) => {
    res.json(
      err ? { error: "Error while fetching data" } : result
    )
  })
}

const getExpiredItems = (req, res) => {
  let query = `
    select itemName, pricePerUnit, expiryDate, quantity
    from inventory
    where expiryDate <= '${sqlDate(new Date())}'
  `;
  sqlConnection.query(query, (err, result) => {
    if(err)
      res.json({ error: "Error while fetching data" });
    else {
      let l = result.length;
      for(let i=0;i<l;++i)
        result[i]['expiryDate'] = userDate(result[i]['expiryDate'])
      res.json(result);  
    }
    
  })

}

module.exports = {
  getLowStockItems,
  getExpiredItems
}