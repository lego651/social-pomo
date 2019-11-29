const functions = require('firebase-functions');
const admin = require('firebase-admin');

const { signup,
        login,
        addUserDetails,
        getUserData,
        addProject,
        removeProject,
        addTag,
        removeTag,
        addInRoom,
        removeInRoom,
        uploadImage,
        updateNickName,
        updatePassword } = require('./handlers/user.js');
const { createRoom,
        addMessage,
        joinRoom,
        countAddOne,
        startCount,
        resetCount,
        leaveRoom,
        deleteRoom,
        deleteMessages } = require('./handlers/room.js');
const { createPomo,
        fetchAllPomo } = require('./handlers/pomo.js');
const FBAuth = require('./utils/fbAuth');

// admin.initializeApp();
const express = require('express');
const app = express();

var cors = require('cors')
app.use(cors());

// User Auth Routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getUserData);
app.post('/user/avatar', FBAuth, uploadImage);
app.post('/user/nickname', FBAuth, updateNickName);
app.post('/user/password', FBAuth, updatePassword);
app.post('/project', FBAuth, addProject);
app.post('/project/remove', FBAuth, removeProject);
app.post('/tag', FBAuth, addTag);
app.post('/tag/remove', FBAuth, removeTag);
app.post('/inroom', FBAuth, addInRoom);
app.get('/inroom/remove', FBAuth, removeInRoom); // deprecated

// Room Routes
app.post('/room', FBAuth, createRoom);
app.post('/message', FBAuth, addMessage);
app.post('/joinroom', FBAuth, joinRoom);
app.post('/countaddone', FBAuth, countAddOne);
app.post('/startcount', FBAuth, startCount);
app.post('/resetcount', FBAuth, resetCount);
app.post('/leaveroom', FBAuth, leaveRoom);
app.post('/messages', FBAuth, deleteMessages);
app.post('/room/delete', FBAuth, deleteRoom);

// Pomo Routes
app.post('/pomo', FBAuth, createPomo);
app.get('/pomo', FBAuth, fetchAllPomo);

app.get('/messages', (req, res) => {
  admin
    .firestore()
    .collection('messages')
    .orderBy('createdAt', 'desc')
    .get()
    .then(snap => {
      let messages = [];
      snap.forEach(doc => {
        messages.push({
            messageId: doc.id,
            content: doc.data().content,
            userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt
        });
      })
      return res.json(messages);
    })
    .catch(err => console.error(err));
});

// app.post('/message', (req, res) => {
//   const newMessage = {
//     content: req.body.content,
//     userHandle: req.body.userHandle,
//     createdAt: new Date().toISOString(),
//   };
//
//   admin.firestore().collection('messages').add(newMessage)
//     .then((doc) => {
//       return res.json({ message: `document ${doc.id} created successfully`});
//     })
//     .catch((err) => {
//       res.status(500).json({ error: 'something went wrong.' });
//       console.error(err);
//     })
// });

// GET request to make readyCount increment by one
app.get('/readyaddone', (req, res) => {
  admin
    .firestore()
    .doc('/meta/us')
  	.get()
  	.then((doc) => {
  		if(!doc.exists) {
  			return res.status(400).json({ error: 'this room name does not exist' });
  		}
      return doc.data().readyCount;
  	})
    .then((prevCount) => {
      const updateCount = {
        readyCount: prevCount + 1
      }
      admin.firestore().doc('/meta/us').set(updateCount)
      return res.status(200).json(updateCount);
    })
  	.catch((err) => {
  		console.error(err);
  		return res.status(500).json({ error: 'Someting went wrong, please try again.' });
  	})
});

// GET request to make readyCount decrement by one
app.get('/readyminusone', (req, res) => {
  admin
    .firestore()
    .doc('/meta/us')
   .get()
   .then((doc) => {
     if(!doc.exists) {
       return res.status(400).json({ error: 'this room name does not exist' });
     }
      return doc.data().readyCount;
   })
    .then((prevCount) => {
      const updateCount = {
        readyCount: prevCount - 1
      }
      admin.firestore().doc('/meta/us').set(updateCount)
      return res.status(200).json(updateCount);
    })
   .catch((err) => {
     console.error(err);
     return res.status(500).json({ error: 'Someting went wrong, please try again.' });
   })
});

// GET request to fetch readyCount number
app.get('/ready', (req, res) => {
  admin.firestore().doc('/meta/us')
    .get()
    .then((doc) => {
      return res.status(200).json(doc.data());
    })
    .catch((err) => {
      console.log(err)
    })
});

// https://baseurl.com/api/
exports.api = functions.https.onRequest(app);
