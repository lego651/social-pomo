

const { admin, db } = require('../utils/admin');

// input: req.body.roomName: String
exports.createRoom = (req, res) => {
  const person = req.user.handle;
  const message = {
    userHandle: req.user.handle,
    content: `${req.user.handle} created room...`,
    createdAt: new Date().toISOString()
  }
  const newRoom = {
    roomName: req.roomName,
    messages: [message],
    people: [person],
    createdAt: new Date().toISOString()
  }
  db.doc(`/rooms/${req.body.roomName}`)
    .get()
    .then((doc) => {
      if(doc.exists) {
        return res.status(400).json({ fail: 'this room name is already taken.' })
      } else {
        return db.doc(`/rooms/${req.body.roomName}`).set(newRoom)
      }
    })
    .then(() => { // upadte 这个 user 的 inRoom
      const userInRoom = {
        inRoom: req.body.roomName
      }
      db.doc(`/users/${req.user.handle}`).update(userInRoom)
      return res.json({ success: 'create Room successfully.' })
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code})
    })
}
