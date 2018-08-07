import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import thechallenger from './routes/challengerRoutes';

let db_url = process.env.DB_URL;
let mongoDB = process.env.MONGODB_URI || db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.log.bind(console, 'MongoDb connection error:'));

const app = express()

app.use(bodyParser.json());
app.use('api/v1/month-form', thechallenger)

const port = 3001;
app.listen(port, () => {
    console.log('Server running on port ' + port);
});

export default app;
