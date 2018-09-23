const { key } = require('../../credentials');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let { token } = req.headers;
  if(token === null || token === undefined || token === "")
    res.json({ auth: -1 });
  else {
    try {
      let decodedData = jwt.verify(token, key);
      req.userData = decodedData;
      next();
    }catch(e) {
      res.json({ auth: -1 });
    }
  }  
}