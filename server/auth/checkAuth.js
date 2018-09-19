const jwt = require('jsonwebtoken');
const { key } = require('../../credentials');

module.exports = (req, res) => {
  try {
    let decodedData = jwt.verify(req.body.token, key);
    res.json(decodedData);
  }catch(err) {
    res.json({ error: "Auth error" })
  }
}