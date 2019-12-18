const { admin, db } = require('../utils/admin');

exports.addToWaiting = (req, res) => {
  const newMember = {
    handle: req.user.handle,
    avatar: req.user.avatar,
    createdAt: new Date().toISOString()
  }

  // db.collection("waiting").add(newMember)
  //   .then((doc) => {
  //     return res.json({ message: 'user added to waiting queue.' })
  //   })
  //   .catch((err) => {
  //     return res.status(500).json({ error: err })
  //   })

  db.collection('waiting')
    .orderBy("createdAt")
    .get()
    .then((snapshot) => { // 首先查看当前 waiting collection
      let pairs = [];
      snapshot.forEach((doc) => {
        pairs.push({
          id: doc.id,
          createdAt: doc.data().createdAt,
          handle1: doc.data().handle1,
          avatar1: doc.data().avatar1,
          handle2: doc.data().handle2,
          avatar2: doc.data().avatar2,
        })
      })
      return pairs;
    })
    .then((pairs) => {
      if(pairs.length === 0) { // 如果当前 waiting 是空的
        const newMember = {
          handle1: req.user.handle,
          avatar1: req.user.avatar,
          handle2: '',
          avatar2: '',
          createdAt: new Date().toISOString()
        }
        db.collection('waiting').add(newMember); // 将当前用户直接add进去
        return { newPair: false }
      } else { // 否则当前waiting不是空，查看是否有handle2的空位的
        for(let i = 0, len = pairs.length; i < len; i++) {
          if(pairs[i].handle2.length === 0) { // update 当前pair
            db.doc(`/waiting/${pairs[i].id}`).update({
              handle2: req.user.handle,
              avatar2: req.user.avatar,
            })
            // return pairs[i].id;
            return {
              newPair: true,
              id: pairs[i].id,
              handle1: pairs[i].handle1,
              avatar1: pairs[i].avatar1,
              handle2: req.user.handle,
              avatar2: req.user.avatar,
            }
          }
        }
      }
      const newMember = {
        handle1: req.user.handle,
        avatar1: req.user.avatar,
        handle2: '',
        avatar2: '',
        createdAt: new Date().toISOString()
      }
      db.collection('waiting').add(newMember);
      return { newPair: false };
    })
    .then((data) => {
      if(data.newPair) { // 如果正好是匹配到了handle2
        console.log('to delete data here,', data.id);
        // return;
        // 此处需要把当前 ref 给删掉，同时把 handle1, handle2都放到 ready里面去
        const pair = data;
        db.collection('ready').add({
          handle: pair.handle1,
          room: pair.id
        })
        db.collection('ready').add({
          handle: pair.handle2,
          room: pair.id
        });
        db.collection('waiting')
          .doc(pair.id)
          .delete()
        return res.json({ message: 'paired and deleted.' })
        // return {
        //   id: pair.id,
        //   handle1: pair.handle1,
        //   avatar1: pair.avatar1,
        //   handle2: pair.handle2,
        //   avatar2: pair.avatar2,
        // }
      } else { // 没有匹配到，直接add to waiting queue就行了，其他不用做
        return res.json({ message: 'user added to waiting queue.' })
        // return {};
      }
    })
    // .then((room) => {
    //   // user room.id to create a room that starts immediately
    //   if(room && room.id && room.id.length > 0) {
    //     const newRoom = {
    //       roomName: room.id,
    //       owner: 'admin',
    //       createdAt: new Date().toISOString(),
    //       on: true,
    //       startTime: new Date().getTime(),
    //     }
    //     db.doc(`/rooms/${room.id}`).set(newRoom);
    //     return res.json({ message: 'paired and deleted, get you to room.' })
    //   }
    //   return;
    // })
    .catch((err) => {
      return res.status(500).json({ error: err })
    })
}

// 首先需要从ready里面清空
// 如果房间没创建，就自己是房主，并且进入房间
// 如果房间创建了，就直接加入
// 明显是个post 请求，roomName正好click button的时候带上
exports.joinMatchedRoom = (req, res) => {
  const roomName = req.body.roomName;
  const handle = req.user.handle;
  const avatar = req.user.avatar;
  console.log(roomName, handle, avatar); // PASS!
  db.collection('/ready')
    .get()
    .then((snapshot) => { // 首先查看当前 ready collection
      snapshot.forEach((doc) => {
        if(doc.data().handle === handle) {
          doc.ref.delete();
        }
      })
      return;
    })
    .then(() => { // 然后需要看当前roomName是否存在
      db.doc(`/rooms/${roomName}`)
        .get()
        .then((doc) => {
          const room = {
            ownsRoom: null,
            inRoom: roomName
          }
          if(doc.exists) { // 如果存在，当前用户直接joinRoom
            const updateRoom = {
              people: admin.firestore.FieldValue.arrayUnion({ handle, avatar })
            }
            db.doc(`/rooms/${roomName}`)
              .update(updateRoom)
          } else {
            const newRoom = {
              roomName: roomName,
              owner: handle,
              count: 0,
              people: [{handle, avatar}],
              createdAt: new Date().toISOString(),
              on: false,
              startTime: null
            }
            db.doc(`/rooms/${roomName}`).set(newRoom);
            room.ownsRoom = roomName;
          }
          return room;
        })
        .then((room) => { // upadte 这个 user 的 inRoom
          if(room.ownsRoom !== null) { // ownsRoom 的case
            db.doc(`/users/${req.user.handle}`).update({
              ownsRoom: room.ownsRoom,
              inRoom: room.inRoom
            })
          } else { // 只是joinRoom
            db.doc(`/users/${req.user.handle}`).update({
              inRoom: room.inRoom
            })
          }
          return res.json({ success: 'create Room successfully.' })
        })
        .then(() => {
          const firstMessage = {
            content: `${handle} joined room...`,
            userHandle: handle,
            createdAt: new Date().toISOString()
          }
          return db.collection(`/rooms/${roomName}/messages`).add(firstMessage);
        })
        .catch((err) => {
          return res.status(500).json({ error: err })
        })
      return;
    })
    .catch((err) => {
      return res.status(500).json({ error: err })
    })
}
