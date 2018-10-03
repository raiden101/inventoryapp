const { sqlConnection } = require('../../util/sqlConn');
const { promisify } = require('util');

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

const getLowStockItems = () => {
  let query = `
    select *
    from item
    where quantity <= minQuantity
  `;
  return new Promise((resolve, reject) => {
    sqlConnection.query(query, (err, result) => {
      if(err)
        reject("Error while fetching data!!");
      else {
        let len = result.length;
        for(let i=0;i<len;++i) 
          result[i]['expiryDate'] = userDate(result[i]['expiryDate'])
        resolve(result);
      }
    })
  });
  
}

const getExpiredItems = () => {
  let query = `
    select itemID, itemName, pricePerUnit, expiryDate, quantity
    from item
    where expiryDate <= '${sqlDate(new Date())}'
  `;
  return new Promise((resolve, reject) => {
    sqlConnection.query(query, (err, result) => {
      if(err)
        reject("Error while fetching data!!");
      else {
        let l = result.length;
        for(let i=0;i<l;++i)
          result[i]['expiryDate'] = userDate(result[i]['expiryDate'])
        resolve(result);
      }
    })
  })
}

module.exports = (req, res) => {
  Promise.all([getExpiredItems(), getLowStockItems()])
  .then(data => { res.json(data) })
  .catch(err => { res.json({ error: "Error while fetching data!" }) })
}