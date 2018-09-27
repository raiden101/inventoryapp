const { key } = require('../../credentials');
const jwt = require('jsonwebtoken');

module.exports = adminFlag => (req, res, next) => {
  let { token } = req.headers;
  if(token === null || token === undefined || token === "")
    res.json({ auth: -1 });
  else {
    try {
      let decodedData = jwt.verify(token, key);
      if(decodedData.adminFlag === adminFlag) {
        req.userData = decodedData;
        next();
      }else
        throw new Error("Error");
    }catch(e) {
      res.json({ auth: -1 });
    }
  }
}