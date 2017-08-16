import { https } from 'firebase-functions';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const v1 = express.Router();
app.use(bodyParser.json());
app.use('/v1', v1);
v1.post('/form-description', (request, response) => {
  response.status(200).end();
});

export default https.onRequest(app);
