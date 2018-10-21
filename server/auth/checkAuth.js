const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  try {
    let decodedData = jwt.verify(req.body.token, process.env.KEY);
    res.json(decodedData);
  }catch(err) {
    res.json({ error: "Auth error" })
  }
}