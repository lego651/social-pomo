const { admin, db } = require('../utils/admin');

// input: req.body.roomName: String
// 1.判断当前roomname 是否可用
// 2.如果可用，就创建一个room doc
// 3.创建一个collection /rooms/roomname/getMessages
// 4.往这个里面放一个message
exports.createRoom = (req, res) => {
  const person = req.user.handle;
  const avatar = req.user.avatar;
  const roomName = req.body.roomName;
  const handle = req.user.handle;
  const message = {
    userHandle: handle,
    content: `${handle} created room...`,
    createdAt: new Date().toISOString()
  }
  const newRoom = {
    roomName: roomName,
    owner: person,
    count: 0,
    people: [{handle, avatar}],
    createdAt: new Date().toISOString(),
    on: false,
    startTime: null,
  }
  db.doc(`users/${handle}`)
    .get()
    .then((doc) => {
      if(doc.data().ownsRoom !== null) {
        return res.status(400).json({ fail: 'Please delete your owned room first to create a new one.' })
      }
      return;
    })
    .then(() => {
      db.doc(`/rooms/${roomName}`)
        .get()
        .then((doc) => {
          if(doc.exists) {
            return res.status(400).json({ fail: 'Room name is already taken.' })
          } else {
            return db.doc(`/rooms/${newRoom.roomName}`).set(newRoom)
          }
        })
        .then(() => { // upadte 这个 user 的 inRoom
          const userInRoom = {
            inRoom: roomName,
            ownsRoom: roomName
          }
          db.doc(`/users/${req.user.handle}`).update(userInRoom)
          return res.json({ success: 'create Room successfully.' })
        })
        .then(() => { // 在 /rooms/roomname/messages 这个collection里面添加第一个message
          const firstMessage = {
            content: `${person} created room...`,
            userHandle: handle,
            createdAt: new Date().toISOString()
          }
          return db.collection(`/rooms/${roomName}/messages`).add(firstMessage);
        })
        .catch((err) => {
          return res.status(500).json({ error: err.code})
        })
      return;
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code})
    })


}

// POST message, add a new message in that room
exports.addMessage = (req, res) => {
  const newMessage = {
    content: req.body.content,
    userHandle: req.body.userHandle,
    avatar: req.user.avatar,
    createdAt: new Date().toISOString()
  }
  const roomname = req.body.roomName
  db.collection(`/rooms/${roomname}/messages`).add(newMessage)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created successfully`});
    })
    .catch((err) => {
      res.status(500).json({ error: err.code })
    })
}

// Post message, b1 join an existingRoom
exports.joinRoom = (req, res) => {
  const roomName = req.body.roomName;
  const handle = req.user.handle;
  const avatar = req.user.avatar;

  db.doc(`/rooms/${roomName}`)
    .get()
    .then((doc) => {
      if(!doc.exists) { // 如果房间名不存在，告知用户
        return res.status(400).json({ fail: 'Room name does exist yet.' })
      }
      return;
    })
    .then(() => { // upadte 这个 user 的 inRoom
      const userInRoom = {
        inRoom: roomName
      }
      db.doc(`/users/${req.user.handle}`).update(userInRoom);
      return;
    })
    .then(() => {
      const newMessage = {
        content: `${handle} joined room...`,
        userHandle: handle,
        createdAt: new Date().toISOString()
      }
      return db.collection(`/rooms/${roomName}/messages`).add(newMessage);
    })
    .then(() => { // add current user to people in room
        const updateRoom = {
          people: admin.firestore.FieldValue.arrayUnion({ handle, avatar })
        }
        db.doc(`/rooms/${roomName}`)
          .update(updateRoom)
        return res.status(200).json({ success: 'add user to room people array' });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    })
}

// POST: room count add one
exports.countAddOne = (req, res) => {
  db.doc(`/rooms/${req.body.roomName}`)
    .get()
    .then((doc) => {
      if(!doc.exists) {
        return res.status(400).json({ error: 'this room name does not exist' });
      }
       return doc.data().count;
    })
    .then((prevCount) => {
      const updateCount = {
        count: prevCount + 1
      }
      db.doc(`/rooms/${req.body.roomName}`).update(updateCount);
      return res.status(200).json(updateCount);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    })
}

// POST: room start count down and set on to true
exports.startCount = (req, res) => {
  db.doc(`/rooms/${req.body.roomName}`)
    .get()
    .then((doc) => {
      if(!doc.exists) {
        return res.status(400).json({ error: 'this room name does not exist'});
      }
      // update start time and set on to true
      const toUpdate = {
        on: true,
        startTime: new Date().getTime()
      }
      db.doc(`/rooms/${req.body.roomName}`).update(toUpdate);
      return res.status(200).json(toUpdate);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    })
}

exports.resetCount = (req, res) => {
  db.doc(`/rooms/${req.body.roomName}`)
    .get()
    .then((doc) => {
      if(!doc.exists) {
        return res.status(400).json({ error: 'this room name does not exist'});
      }
      // update start time and set on to true
      const toUpdate = {
        on: false,
        startTime: null
      }
      db.doc(`/rooms/${req.body.roomName}`).update(toUpdate);
      return res.status(200).json(toUpdate);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    })
}

// POST: update user inRoom to null, and remove current user from room.people
exports.leaveRoom = (req, res) => {
  const roomName = req.body.roomName;
  const toUpdate = {
    inRoom: null
  }
  db.doc(`/users/${req.user.handle}`).update(toUpdate)
    .then((data) => {
      const updateRoom = {
        people: admin.firestore.FieldValue.arrayRemove(req.user.handle)
      }
      db.doc(`/rooms/${roomName}`)
        .update(updateRoom)
      return res.status(200).json({ success: 'leave room successfully' });
    })
    .catch((err) => {
      return res.status(500).json({error: err.code});
    })
};

// Delete: delete room.messages subcollection
exports.deleteMessages = (req, res) => {
  const roomName = req.body.roomName;
  db.collection(`/rooms/${roomName}/messages`)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete();
      })
      return;
    })
    .then(() => {
      return res.status(200).json({ success: 'delete messages successfully' });
    })
    .catch((err) => {
      return res.status(500).json({error: err.code});
    })
};

// Delete: delete room document
exports.deleteRoom = (req, res) => {
  const roomName = req.body.roomName;
  db.doc(`/rooms/${roomName}`)
    .delete()
    .then(() => {
      const userOwnsRoom = {
        ownsRoom: null,
        inRoom: null
      }
      db.doc(`/users/${req.user.handle}`).update(userOwnsRoom);
      return res.status(200).json({ success: 'Room deleted successfully.' });
    })
    .catch((err) => {
      return res.status(500).json({error: err});
    })
}
