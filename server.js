const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 5000;

const { closeConn, startConn } = require('./server/util/sqlConn');
const auth = require('./server/auth');
const adminAPI = require('./server/InvAdmin');

const tokenVerificationM = require('./server/auth/verifyTokenMiddleware');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/auth', auth);

app.use('/api/admin', tokenVerificationM, adminAPI);

startConn(threadID => {
  console.log("Connection with sql started, threadID: ", threadID);
})

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




