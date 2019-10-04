const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const express = require('express');
const app = express();

var cors = require('cors')
app.use(cors());

// app.get('/messages', (req, res) => {
//   admin
//     .firestore()
//     .collection('messages')
//     .orderBy('createdAt', 'desc')
//     .get()
//     .then(snap => {
//       let messages = [];
//       snap.forEach(doc => {
//         messages.push({
//             messageId: doc.id,
//             content: doc.data().content,
//             userHandle: doc.data().userHandle,
//             createdAt: doc.data().createdAt
//         });
//       })
//       return res.json(messages);
//     })
//     .catch(err => console.error(err));
// });

app.post('/message', (req, res) => {
  const newMessage = {
    content: req.body.content,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  };

  admin.firestore().collection('messages').add(newMessage)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created successfully`});
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went wrong.' });
      console.error(err);
    })
});

// https://baseurl.com/api/
exports.api = functions.https.onRequest(app);
