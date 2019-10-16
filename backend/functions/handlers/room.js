

const { admin, db } = require('../utils/admin');

// input: req.body.roomName: String
// 1.判断当前roomname 是否可用
// 2.如果可用，就创建一个room doc
// 3.创建一个collection /rooms/roomname/getMessages
// 4.往这个里面放一个message
exports.createRoom = (req, res) => {
  console.log(req.body);
  const person = req.user.handle;
  const roomName = req.body.roomName;
  const handle = req.user.handle;
  const message = {
    userHandle: handle,
    content: `${handle} created room...`,
    createdAt: new Date().toISOString()
  }
  const newRoom = {
    roomName: roomName,
    people: [person],
    createdAt: new Date().toISOString()
  }
  db.doc(`/rooms/${roomName}`)
    .get()
    .then((doc) => {
      if(doc.exists) {
        console.log(doc.data());
        return res.status(400).json({ fail: 'this room name is already taken.' })
      } else {
        return db.doc(`/rooms/${newRoom.roomName}`).set(newRoom)
      }
    })
    .then(() => { // upadte 这个 user 的 inRoom
      const userInRoom = {
        inRoom: roomName
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
      console.error(err);
      return res.status(500).json({ error: err.code})
    })
}

// POST message, add a new message in that room
exports.addMessage = (req, res) => {
  const newMessage = {
    content: req.body.content,
    userHandle: req.body.userHandle,
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

  db.doc(`/rooms/${roomName}`)
    .get()
    .then((doc) => {
      if(!doc.exists) { // 如果房间名不存在，告知用户
        return res.status(400).json({ fail: 'this room name does exist yet.' })
      }
      return res.status(200).json({ success: 'join room successfully.'})
    })
    .then(() => {
      const newMessage = {
        content: `${handle} joined room...`,
        userHandle: handle,
        createdAt: new Date().toISOString()
      }
      return db.collection(`/rooms/${roomName}/messages`).add(newMessage);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code})
    })
}
