const { sqlConnection } = require('../../util/sqlConn');

module.exports = (req, res) => {
  let { owner, shop } = req.body;
  let query1 = `insert into shop set ?`;
  let query2 = "insert into owner set ?"
  sqlConnection.query(query1, shop, (err, result1) => {
    if(!err) {
      let data = {
        ...owner, 
        shopID: result1.insertId,
        password: result1.insertId
      }
      sqlConnection.query(query2, data, (err, result2) => {
        if(err)
          res.json({ success: false, msg: "Error while uploading. " });
        else
          res.json({ msg: `Successfull! shopID: ${result1.insertId}`, success: true })          
      })
    }else
      res.json({ success: false, msg: "Error while uploading. " });
  })
}