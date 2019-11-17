const firebase = require('firebase');

const config = require('../utils/config.js');
const { validateSignupData, validateLoginData } = require('../utils/validators.js');
const { admin, db } = require('../utils/admin');

// Init Firebase to client side
firebase.initializeApp(config);

// Sign Up
exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle.trim()
  };

  const { valid, errors } = validateSignupData(newUser);
  console.log(errors);

  if(!valid) return res.status(400).json(errors);

  let token, userId;

  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if(doc.exists) {
        return res.status(400).json({ handle: 'username is already in use.'});
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
        allowed: true,
        inRoom: null,
        ownsRoom: null,
        nickName: newUser.handle,
        projects: [],
        tags: [],
        avatar: `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
        }/o/defaultAvatar.jpg?alt=media`
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      // console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already is use.' });
      } else {
        return res
          .status(500)
          .json({ general: 'Something went wrong, please try again.' });
      }
    });
};

// Log in
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      // auth/wrong-password
      // auth/user-not-user
      return res
        .status(403)
        .json({ password: 'Wrong credentials, please try again' });
    });
};

// Add User Details
exports.addUserDetails = (req, res) => {
  let userDetails = req.body;

  db.doc(`/users/${req.user.handle}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: 'Details added successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Get any user's details
exports.getUserData = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.profile = doc.data();
        return res.status(200).json(userData);
      } else {
        return res.status(404).json({ errror: 'User not found' });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// POST: update nickName
exports.updateNickName = (req, res) => {
  const nickName = req.body.nickName;
  const toUpdate = {
    nickName: nickName
  }
  db.doc(`/users/${req.user.handle}`).update(toUpdate)
    .then((data) => {
      return res.status(200).json({success: 'nickName updated!'});
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({error: err.code});
    })
}

// Upload a profile image for user
exports.uploadImage = (req, res) => {
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ fail: 'Wrong file type submitted' });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on('finish', () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      })
      .then(() => {
        const avatar = `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
        }/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.handle}`).update({ avatar });
      })
      .then(() => {
        return res.json({ message: 'image uploaded successfully' });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: 'something went wrong' });
      });
  });
  busboy.end(req.rawBody);
};

// POST: add user inRoom
exports.addInRoom = (req, res) => {
  const inRoom = req.body.inRoom;
  const toUpdate = {
    inRoom: inRoom
  }
  db.doc(`/users/${req.user.handle}`).update(toUpdate)
    .then((data) => {
      return res.status(200).json({success: 'inroom updated!'});
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({error: err.code});
    })
};

// POST: update user inRoom to null
exports.removeInRoom = (req, res) => {
  const toUpdate = {
    inRoom: null
  }
  db.doc(`/users/${req.user.handle}`).update(toUpdate)
    .then((data) => {
      return res.status(200).json({success: 'inroom removed!'});
    })
    .catch((err) => {
      return res.status(500).json({error: err.code});
    })
};

// POST: add project name to user's projects
exports.addProject = (req, res) => {
  const updatedProjects = {
    projects: admin.firestore.FieldValue.arrayUnion(req.body.project)
  }
  db.doc(`/users/${req.user.handle}`)
    .update(updatedProjects)
  return res.status(200).json({success: 'new project added.'});
};

// POST: remove project name from user's projects
exports.removeProject = (req, res) => {
  const updatedProjects = {
    projects: admin.firestore.FieldValue.arrayRemove(req.body.project)
  }
  db.doc(`/users/${req.user.handle}`)
    .update(updatedProjects)
  return res.status(200).json({success: 'selected project name removed.'});
};

// POST: add new tag name to user's tags
exports.addTag = (req, res) => {
  const updatedTags = {
    tags: admin.firestore.FieldValue.arrayUnion(req.body.tag)
  }
  db.doc(`/users/${req.user.handle}`)
    .update(updatedTags)
  return res.status(200).json({success: 'new tag name added.'});
};

// POST: remove tag name from user's tags
exports.removeTag = (req, res) => {
  const updatedTags = {
    tags: admin.firestore.FieldValue.arrayRemove(req.body.tag)
  }
  db.doc(`/users/${req.user.handle}`)
    .update(updatedTags)
  return res.status(200).json({success: 'selected tag name removed.'});
};
