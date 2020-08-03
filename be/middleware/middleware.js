const jwt = require('jsonwebtoken');
const secret = 'muSecretValue1';

const withAuth = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({
      message: 'Unauthorized: No token provided'
    });
  } else {
    jwt.verify(token, secret, function (err, user) {
      if (err) {
        res.status(401).json({
          message: 'Unauthorized: Invalid token'
        });
      } else {
        req.id = user.id;
        next();
      }
    });
  }
}

module.exports = withAuth;