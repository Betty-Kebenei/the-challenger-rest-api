const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let db_url = process.env.DB_URL;
let mongoDB = process.env.MONGODB_URI || db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.log.bind(console, 'MongoDb connection error:'));

const thechallenger = require('./routes/challengerRoutes');
const app = express()

app.use(bodyParser.json());
app.use('/', thechallenger)

const port = 3001;
app.listen(port, () => {
    console.log('Server running on port ' + port);
});