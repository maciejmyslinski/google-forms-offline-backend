import { https } from 'firebase-functions';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

export default https.onRequest(app);
