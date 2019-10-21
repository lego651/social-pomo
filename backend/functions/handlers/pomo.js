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
