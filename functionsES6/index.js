import functions from 'firebase-functions';
import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
const app = express();
const v1 = express.Router();
app.use(bodyParser.json());
app.use('/v1', v1);
v1.post('/form-description', (request, response) => {
  if (!request.body.id) {
    response.status(400).end();
  }
  const formsRef = admin.database().ref('forms');
  formsRef.child(request.id).set(request.body);
  response.status(200).end();
});

export default functions.https.onRequest(app);
