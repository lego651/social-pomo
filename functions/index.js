const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.cronFn = functions.pubsub
  .schedule('* * * * *')
  .onRun(() => {
    console.log('Hello Cron.');
    db.doc('/meta/us')
      .get()
      .then((doc) => {
        // return res.status(200).json(doc.data());
        console.log('data we got is', doc.data())
      })
      .catch((err) => {
        console.log(err)
      })
    return "some value";
  })
