const { admin, db } = require('./admin');

// module.exports = (req, res, next) => {
//   let idToken;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer ')
//   ) {
//     idToken = req.headers.authorization.split('Bearer ')[1];
//   } else {
//     // console.error('No token found');
//     return res.status(403).json({ error: 'Unauthorized' });
//   }
  
//   admin
//     .auth()
//     .verifyIdToken(idToken)
//     .then((decodedToken) => {
//       req.user = decodedToken;
//       return db
//         .collection('users')
//         .where('userId', '==', req.user.uid)
//         .limit(1)
//         .get();
//     })
//     .then((data) => {
//       req.user.handle = data.docs[0].data().handle;
//       req.user.avatar = data.docs[0].data().avatar;
//       return next();
//     })
//     .catch((err) => {
//       // console.error('Error while verifying token ', err);
//       return res.status(403).json(err);
//     });
// };

module.exports = (req, res, next) => {
  let idToken;
  let cookie;
  if (
    req.headers.authorization &&
    req.headers.authorization.includes(' Bearer ')
  ) {
    idToken = req.headers.authorization.split(' Bearer ')[1];
    cookie = req.headers.authorization.split(' Bearer ')[0];
  } else {
    // console.error('No token found');
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  admin.auth().verifySessionCookie(cookie, true)
    .then((decodedToken) => {
      console.log("decodedToken is:", decodedToken);
      req.user = decodedToken;
      return db
        .collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.user.handle = data.docs[0].data().handle;
      return next();
    })
		.catch(error => {
      console.log("redirect error:", error)
			// Session cookie is unavailable or invalid. Force user to login.
			res.redirect('/login');
		});
};

