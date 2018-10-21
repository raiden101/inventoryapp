const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { closeConn, startConn } = require('./server/util/sqlConn');
const auth = require('./server/auth');
const adminAPI = require('./server/InvAdmin');
const userAPI = require('./server/user');

const tokenVerificationGen = require('./server/auth/tokenVerificationGenerator');
const adminTokenMiddleware = tokenVerificationGen(1);
const userTokenMiddleware = tokenVerificationGen(0);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/auth', auth);

app.use('/api/admin', adminTokenMiddleware, adminAPI);

app.use('/api/user', userTokenMiddleware, userAPI);

app.use(express.static(path.join(__dirname, "./build")));

startConn(threadID => {
  console.log("Connection with sql started, threadID: ", threadID);
})

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening to port ${port}`)
});

process.on('SIGINT', () => {
  closeConn(() => {
    console.log("Connection with sql closed");
    process.exit(0);
  })
});

process.once('exit', () => {
  closeConn(() => {
    console.log("Connection with sql closed");    
  })
})




