const firebase = require('firebase');

// config
const firebaseConfig = require('../config/firebase.js');

// utils
const { validateSignupData, validateLoginData } = require('../utils/validators.js');
const { admin, db } = require('../utils/admin');

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

  if(!valid) return res.status(400).json({
    success: false,
    message: "invalid form",
    error_code: 400,
    data: errors
  });

  let token, userId, cookie;
  const expiresIn = 60 * 60 * 24 * 1000;

  db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if(doc.exists) {
        return res.status(400).json({
          success: false,
          message: "username is already in use",
          error_code: 400,
          data: {
            handle: "username is already in use"
          }
        })
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
        projects: ['Other'],
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
      res.cookie('__session', sessionCookie, options);
      return admin.auth().verifyIdToken(token)
    })
    .then(decodedClaims => {
      return res.status(201).json({ 
        success: true,
        message: "user registed successfully",
        error_code: 201,
        data: {
          token,
          cookie
        }
      });   
    })
    .catch((err) => {
      console.log(err)
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ 
          success: false,
          message: "invalid email",
          error_code: 400,
          data: {
            email: 'Email is already is use'
          }
        });
      } else {
        return res.status(500).json({ 
          success: false,
          message: "invalid request",
          error_code: 400,
          data: {
            general: 'Something went wrong, please try again'
          }
        });
      }
    });
  return null;
}

// Log in
// 当前版本没有判断是Email的问题还是Password的问题，统一回答Wrong Credentials
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  //
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();   
    })
    .then((token) => {
      const expiresIn = 60 * 60 * 24 * 1000;
      return admin.auth().createSessionCookie(token, {expiresIn})
      .then((sessionCookie) => {
        
        // Set cookie policy for session cookie and set in response.
        const options = {maxAge: expiresIn, httpOnly: true, secure: true};
        res.cookie('__session', sessionCookie, options);
        
        admin.auth().verifyIdToken(token)
          .then(function(decodedClaims) {
            // return res.redirect('/home');
            return res.json({ token: token, cookie: sessionCookie });
          })
          .catch(err => {
            console.log(err.code + err.message);
          })     
        return;     
      })
      .catch(err => {
        console.log(err.code + err.message);
        res.status(401).send('UNAUTHORIZED REQUEST!');
      })
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(403)
        .json({ password: 'Email or password is incorrect, please try again.' });
    });

  // Default
  // firebase
  //   .auth()
  //   .signInWithEmailAndPassword(user.email, user.password)
  //   .then((data) => {
  //     return data.user.getIdToken();
  //   })
  //   .then((token) => {
  //     return res.json({ token });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return res
  //       .status(403)
  //       .json({ password: 'Email or password is incorrect, please try again.' });
  //   });

  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  //   .then(() => {
  //     firebase.auth()
  //       .signInWithEmailAndPassword(user.email, user.password)
  //       .then((data) => {
  //         return data.user.getIdToken();
  //       })
  //       .then((token) => {
  //         return res.json({ token });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return res
  //           .status(403)
  //           .json({ password: 'Email or password is incorrect, please try again.' });
  //       });
  //       return;
  //   })  
  //   .catch(function(error) {
  //     console.log(error.code + error.message);
  //   });
};

// function setCookie(idToken, res) {
// 	// Set session expiration to 5 days.
// 	// Create the session cookie. This will also verify the ID token in the process.
// 	// The session cookie will have the same claims as the ID token.
	
// 	const expiresIn = 60 * 60 * 24 * 5 * 1000;
//   admin.auth().createSessionCookie(idToken, {expiresIn})
//   .then((sessionCookie) => {
		
// 		// Set cookie policy for session cookie and set in response.
// 		const options = {maxAge: expiresIn, httpOnly: true, secure: true};
// 		res.cookie('__session', sessionCookie, options);
		
// 		return admin.auth().verifyIdToken(idToken).then(function(decodedClaims) {
//       // return res.redirect('/home');
//       return res.json({ token });
// 		});
			
//   })
//   .catch(err => {
//     console.log(err.code + err.message);
//     res.status(401).send('UNAUTHORIZED REQUEST!');
//   })
// }

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
