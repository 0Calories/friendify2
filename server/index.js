const admin = require('firebase-admin');
const QRCode = require('qrcode');
const express = require('express');
const app = express();
const port = 4200;

const serviceAccount = require('./auth.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hack-the-north-2019-97ff8.firebaseio.com'
});

app.get('/', (req, res) => res.send('Hello World!'));

// POST /users/create
app.post('/users/create', (req, res) => {
  
});

app.listen(port, () => console.log(`Listening on port ${port}!`));