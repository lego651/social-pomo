const { convertDateToSeq } = require('../utils/date');
const { admin, db } = require('../utils/admin');

exports.createPomo = (req, res) => {
  const DateObj = req.body.dateObj;
  const newPomo = {
    handle: req.user.handle,
    content: req.body.content,
    project: req.body.project,
    tag: req.body.tag,
    // createdAt: new Date().toISOString(),
    // month: new Date().getMonth(),
    // date: new Date().getDate(),
    // day: new Date().getDay(),
    // hour: new Date().getHours(),
    // minute: new Date().getMinutes()
    createdAt: new Date().toISOString(),
    month: req.body.month,
    date: req.body.date,
    day: req.body.day,
    hour: req.body.hour,
    minute: req.body.minute,
    seq: req.body.seq,
    avatar: req.body.avatar,
    nickName: req.body.nickName,
    type: req.body.type,
    time: req.body.time,
    public: req.body.public,
  }
  db.collection("pomos").add(newPomo)
    .then((doc) => {
      return res.json({ message: `pomo ${doc.id} created successfully`});
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    })
}

exports.fetchAllPomo = (req, res) => {
  const handle = req.user.handle;
  db.collection('pomos')
    .where("handle", "==", handle)
    .orderBy("createdAt")
    .get()
    .then((data) => {
      let pomos = [];
      data.forEach((doc) => {
        pomos.push({
          content: doc.data().content,
          createdAt: doc.data().createdAt,
          project: doc.data().project,
          tag: doc.data().tag,
          date: doc.date().date,
          type: doc.data().type,
          time: doc.data().time,  
        })
      });
      return res.json(pomos);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    })
}

// Today Pomos
exports.getTodayPomoCount = (req, res) => {
  const handle = req.user.handle;
  const dateObj = new Date();
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth();
  const d = dateObj.getDate();
  const s = convertDateToSeq(y, m + 1, d);

  db.collection('pomos')
    .where("seq", "==", s)
    .where("handle", "==", handle)
    .get()
    .then((data) => {
      return res.json({ count: data.size })
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    })
}

// Today Pomo List 
exports.getTodayPomoList = (req, res) => {
  const handle = req.user.handle;
  const dateObj = new Date();
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth();
  const d = dateObj.getDate();
  const s = convertDateToSeq(y, m + 1, d);
  
  db.collection('pomos')
    .where("seq", "==", s)
    .where("handle", "==", handle)
    .get()
    .then((snapshot) => {
      let pomos = [];
      snapshot.forEach((doc) => {
        pomos.push({
          content: doc.data().content,
          createdAt: doc.data().createdAt,
          project: doc.data().project,
          tag: doc.data().tag,
          date: doc.data().date,
          seq: doc.data().seq, 
          type: doc.data().type,
          time: doc.data().time,  
        })
      });
      return res.json(pomos);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    })
}

// GET: Today Minutes
exports.getTodayMinutes = (req, res) => {
  const handle = req.user.handle;
  const dateObj = new Date();
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth();
  const d = dateObj.getDate();
  const s = convertDateToSeq(y, m + 1, d);

  db.collection('pomos')
    .where("seq", "==", s)
    .where("handle", "==", handle)
    .get()
    .then((snapshot) => {
      let minutes = 0;
      snapshot.forEach((doc) => {
        minutes += doc.data().time / 60;
      });
      return res.json(minutes);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    })
}

// Week Pomo List 
exports.getWeekPomoList = (req, res) => {
  const handle = req.user.handle;
  const dateObj = new Date();
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth();
  const d = dateObj.getDate();
  const s = convertDateToSeq(y, m + 1, d);
  
  db.collection('pomos')
    .where("handle", "==", handle)
    .where("seq", "<=", s)
    .where("seq", ">=", s - 6)
    .get()
    .then((snapshot) => {
      let pomos = [];
      snapshot.forEach((doc) => {
        console.log(doc)
        console.log(doc.data())
        pomos.push({
          content: doc.data().content,
          createdAt: doc.data().createdAt,
          project: doc.data().project,
          tag: doc.data().tag,
          date: doc.data().date,
          seq: doc.data().seq, 
          type: doc.data().type,
          time: doc.data().time,  
        })
      });
      return res.json(pomos);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    })
}