const { convertDateToSeq, serializeDate } = require('../utils/date');
const { admin, db } = require('../utils/admin');
const { success, fail } = require('../utils/http');

// POST: Create New Pomo
exports.createPomo = (req, res) => {
  const newDate = new Date();
  const newPomo = {
    handle: req.user.handle,
    content: req.body.content,
    project: req.body.project,
    tag: req.body.tag,
    createdAt: newDate.toISOString(),
    dateSeq: serializeDate(req.body.date),
    avatar: req.body.avatar,
    nickName: req.body.nickName,
    type: req.body.type,
    time: req.body.time,
    public: req.body.public,
  };

  db.collection("pomos").add(newPomo)
    .then(doc => {
      return success(res, {message: `pomo ${doc.id} created successfully`});
    })
    .catch(err => {
      return fail(res, {error: err.code});
    })
}

// GET: Today PomoList 
exports.getTodayPomoList = (req, res) => {
  const handle = req.user.handle;
  const dateSeq = serializeDate(new Date());

  db.collection('pomos')
    .where("dateSeq", "==", dateSeq)
    .where("handle", "==", handle)
    .get()
    .then((snapshot) => {
      let pomos = [];
      let time = 0;
      snapshot.forEach((doc) => {
        pomos.push({
          handle: handle,
          content: req.body.content,
          project: doc.data().project,
          tag: doc.data().tag,
          createdAt: doc.data().createdAt,
          dateSeq: doc.data().dateSeq,
          avatar: doc.data().avatar,
          nickName: doc.data().nickName,
          type: doc.data().type,
          time: doc.data().time,
          public: doc.data().public,
        })
        time += doc.data().time;
      });
      return success(res, { pomos, time });
    })
    .catch((err) => {
      console.log(err)
      return fail(res, err);
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

// GET: All minutes
exports.getAllMinutes = (req, res) => {
  const handle = req.user.handle;
  db.collection('pomos')
    .where("handle", "==", handle)
    .get()
    .then((data) => {
      let minutes = 0;
      data.forEach((doc) => {
        minutes += doc.data().time / 60;
      });
      return res.json(minutes);
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

// GET: Week Minutes
exports.getWeekMinutes = (req, res) => {
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

// GET: Week Pomo List 
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

// DEPRECATED
// exports.createPomo = (req, res) => {
//   const DateObj = req.body.dateObj;
//   const newPomo = {
//     handle: req.user.handle,
//     content: req.body.content,
//     project: req.body.project,
//     tag: req.body.tag,
//     // createdAt: new Date().toISOString(),
//     // month: new Date().getMonth(),
//     // date: new Date().getDate(),
//     // day: new Date().getDay(),
//     // hour: new Date().getHours(),
//     // minute: new Date().getMinutes()
//     createdAt: new Date().toISOString(),
//     month: req.body.month,
//     date: req.body.date,
//     day: req.body.day,
//     hour: req.body.hour,
//     minute: req.body.minute,
//     seq: req.body.seq,
//     avatar: req.body.avatar,
//     nickName: req.body.nickName,
//     type: req.body.type,
//     time: req.body.time,
//     public: req.body.public,
//   }
//   db.collection("pomos").add(newPomo)
//     .then((doc) => {
//       return res.json({ message: `pomo ${doc.id} created successfully`});
//     })
//     .catch((err) => {
//       return res.status(500).json({ error: err.code });
//     })
// }

// GET: Today Pomo List 
// exports.getTodayPomoList = (req, res) => {
//   const handle = req.user.handle;
//   const dateObj = new Date();
//   const y = dateObj.getFullYear();
//   const m = dateObj.getMonth();
//   const d = dateObj.getDate();
//   const s = convertDateToSeq(y, m + 1, d);
  
//   db.collection('pomos')
//     .where("seq", "==", s)
//     .where("handle", "==", handle)
//     .get()
//     .then((snapshot) => {
//       let pomos = [];
//       snapshot.forEach((doc) => {
//         pomos.push({
//           content: doc.data().content,
//           createdAt: doc.data().createdAt,
//           project: doc.data().project,
//           tag: doc.data().tag,
//           date: doc.data().date,
//           seq: doc.data().seq, 
//           type: doc.data().type,
//           time: doc.data().time,  
//         })
//       });
//       return res.json(pomos);
//     })
//     .catch((err) => {
//       return res.status(500).json({ error: err });
//     })
// }