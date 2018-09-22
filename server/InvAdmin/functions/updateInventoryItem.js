const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let data = req.body;
  if(data.itemID) {
    let query = "update inventory set ";
    let id = data.itemID;
    delete data['itemID'];
    for(let key in data) {
      let value = data[key];
      if(key.match(/^(quantity|itemID|pricePerUnit|minQuantity)$/i))
        query += `${key}=${value}, `;
      else
        query += `${key}='${value}', `;
    }    
    query = query.substr(0, query.length-2) + ` where itemID=${id};`;
    sqlConnection.query(query, (err, result) => {
      if(err)
        res.json({ error: "Error while updating!!" });
      else
        res.json("Updation successfull");
    })
  }else
    res.json("Invalid data!!");
}