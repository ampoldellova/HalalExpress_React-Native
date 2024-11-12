const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

dotenv.config()

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

mongoose.connect(process.env.MONGO_URL).then(() => console.log('Database Connected')).catch((err) => console.log(err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT || port, () => console.log(`HalalExpress app listening on port ${process.env.PORT}!`))