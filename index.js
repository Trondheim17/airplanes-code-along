const express = require("express");

require('dotenv').config()

const ctrl = require('./controller')

const massive = require('massive')

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  }
}).then((dbInstance) => {
  app.set('db', dbInstance)
  console.log('db connection successful')
}).catch(err => console.log(err))

// ! ENDPOINTS GO HERE
app.get('/api/planes', ctrl.getPlanes)
app.post('/api/planes', ctrl.addPlane)

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});

