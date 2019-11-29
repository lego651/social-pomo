const { admin, db } = require('../utils/admin');

exports.createPomo = (req, res) => {
  const newPomo = {
    handle: req.user.handle,
    content: req.body.content,
    project: req.body.project,
    tag: req.body.tag,
    createdAt: new Date().toISOString()
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
          tag: doc.data().tag
        })
      });
      return res.json(pomos);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    })
}
