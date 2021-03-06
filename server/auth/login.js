const jwt = require('jsonwebtoken');

const { sqlConnection } = require('../util/sqlConn');

const getTokenFor = (obj, callback) => {
  jwt.sign(obj, process.env.KEY, { expiresIn: 60 * 60 }, (err, token) => {
    if(err)
      callback("Error while generating token", null);
    else
      callback(null, token);
  });
}

module.exports = (req, res) => {
  let username = req.body.username.replace(/'/g, "''");
  let password = req.body.password.replace(/'/g, "''");

  let loginQuery = req.body.adminFlag === 1 ? `select count(*) 
  from admin
  where username='${username}' and
  password='${password}'` : 
  `select count(*) 
  from owner
  where shopid='${username}' and
  password='${password}'   
  `

  sqlConnection.query(loginQuery, (err, result, fields) => {
    let resCount = result[0]['count(*)'];
    if(resCount > 0) {
      getTokenFor({
        username: username,
        adminFlag: req.body.adminFlag
      }, (err, token) => {
        if(err)
          res.json({ error: "Error while loggin in!" });
        else
          res.json(token);
      })
    }
    else 
      res.json({ error: "Invalid username or password" });
  });
  
}