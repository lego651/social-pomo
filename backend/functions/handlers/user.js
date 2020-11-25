const firebase = require('firebase');

// config
const firebaseConfig = require('../config/firebase.js');

// utils
const { validateSignupData, validateLoginData } = require('../utils/validators.js');
const { admin, db } = require('../utils/admin');
const { success, fail } = require('../utils/http');

// Init Firebase to client side
firebase.initializeApp(firebaseConfig);

// POST: Sign Up
exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle.trim()
  };

  const { valid, errors } = validateSignupData(newUser);

  if(!valid) return fail(res, errors, "invalid form");

  let token, userId, cookie;
  const expiresIn = 60 * 60 * 24 * 1000;

  db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if(doc.exists) {
        return fail(res, {handle: "username is already in use"});
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(createdUser => {
      userId = createdUser.user.uid;
      return createdUser.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userDetails = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
        allowed: true,
        matching: false,
        inRoom: null,
        ownsRoom: null,
        nickName: newUser.handle,
        projects: ["Other"],
        tags: [],
        avatar: `https://firebasestorage.googleapis.com/v0/b/${
          firebaseConfig.storageBucket
        }/o/defaultAvatar.jpg?alt=media`,
        stopwatch: {
          on: false,
          startingTime: null,
          pauseTimer: null
        }
      };
      return db.doc(`/users/${newUser.handle}`).set(userDetails);
    })
    .then(() => {
      return admin.auth().createSessionCookie(token, {expiresIn})
    })
    .then(sessionCookie => {
      // Set cookie policy for session cookie and set in response.
      cookie = sessionCookie;
      const options = {maxAge: expiresIn, httpOnly: true, secure: true};
      res.cookie("__session", sessionCookie, options);
      return admin.auth().verifyIdToken(token)
    })
    .then(decodedClaims => {
      return success(res, {token, cookie}, "user registered successfully", 201);
    })
    .catch((err) => {
      if (err.code === 'auth/email-already-in-use') {
        return fail(res, {email: "Email is already is use"}, "invalid email");
      } else {
        return fail(res, {general: "Something went wrong, please try again"}, _, 500);
      }
    });
  return null;
}

// POST: Log in
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) {
    return fail(res, errors, "wrong credentials");
  }

  let token, cookie;
  const expiresIn = 60 * 60 * 24 * 1000;

  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => data.user.getIdToken())
    .then(idToken => { 
      token = idToken;
      return admin.auth().createSessionCookie(token, {expiresIn})
    }) 
    .then(sessionCookie => {
        // Set cookie policy for session cookie and set in response.
        cookie = sessionCookie;
        const options = {maxAge: expiresIn, httpOnly: true, secure: true};
        res.cookie('__session', sessionCookie, options);
        return admin.auth().verifyIdToken(token)
    })
    .then(decodedClaims => {
      return success(res, {token, cookie}, "user logged in successfully", 201); 
    })
    .catch((err) => {
      return fail(res, {password: "Email or password is incorrect, please try again"}, err.message, 403);
    });
  return null;
}

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
      return res.status(200).json({ success: 'Nickname updated successfully.' });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({error: err.code});
    })
}

// POST: update password
exports.updatePassword = (req, res) => {
  const password = req.body.password;
  const newPassword = req.body.newPassword;

  firebase
    .auth()
    .signInWithEmailAndPassword(req.user.email, password)
    .then((data) => {
      return data.user.updatePassword(newPassword);
    })
    .then((data) => {
      return res.status(200).json({ success: 'New password set successfully.' });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(403)
        .json({ password: 'Wrong password, please try again' });
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
          firebaseConfig.storageBucket
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
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if(!doc.exists) {
        return res.status(404).json({project: 'User not found.'});
      }
      if(doc.data().projects && doc.data().projects.length > 0 && doc.data().projects.includes(req.body.project)) {
        return res.status(400).json({project: 'Project name already exists.'});
      }
      return;
    })
    .then(() => {
      const updatedProjects = {
        projects: admin.firestore.FieldValue.arrayUnion(req.body.project)
      }
      db.doc(`/users/${req.user.handle}`)
        .update(updatedProjects)
      return res.status(200).json({project: 'New project added.'});
    })
    .catch((err) => {
      return res.status(500).json({error: err});
    })
};

// POST: remove project name from user's projects
exports.removeProject = (req, res) => {
  const updatedProjects = {
    projects: admin.firestore.FieldValue.arrayRemove(req.body.project)
  }
  db.doc(`/users/${req.user.handle}`)
    .update(updatedProjects)
  return res.status(200).json({success: 'Selected project name removed.'});
};

// POST: add new tag name to user's tags
exports.addTag = (req, res) => {
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if(!doc.exists) {
        return res.status(404).json({tag: 'User not found.'});
      }
      if(doc.data().tags && doc.data().tags.length > 0 && doc.data().tags.includes(req.body.tag)) {
        return res.status(400).json({tag: 'Tag name already exists.'});
      }
      return;
    })
    .then(() => {
      const updatedTags = {
        tags: admin.firestore.FieldValue.arrayUnion(req.body.tag)
      }
      db.doc(`/users/${req.user.handle}`)
        .update(updatedTags)
      return res.status(200).json({tag: 'new tag added.'});
    })
    .catch((err) => {
      return res.status(500).json({error: err});
    })
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
