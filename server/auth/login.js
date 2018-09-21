const jwt = require('jsonwebtoken');

const { sqlConnection } = require('../util/sqlConn');
const { key } = require('../../credentials');

const getTokenFor = (obj, callback) => {
  jwt.sign(obj, key, { expiresIn: 60 * 60 }, (err, token) => {
    if(err)
      callback("Error while generating token", null);
    else
      callback(null, token);
  });
}

module.exports = (req, res) => {
  let loginQuery = `select count(*) 
  from admin 
  where username='${req.body.username}' and
  password='${req.body.password}'`;

  sqlConnection.query(loginQuery, (err, result, fields) => {
    let resCount = result[0]['count(*)'];
    if(resCount > 0) {
      getTokenFor({
        username: req.body.username,
        password: req.body.password
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