const jwt = require('jsonwebtoken');
const secret = 'muSecretValue';

const withAuth = function (req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({
            message: 'Unauthorized: No token provided'
        });
    } else {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.status(401).json({
                    message: 'Unauthorized: Invalid token'
                });
            } else {
                req.id = decoded.id;
                next();
            }
        });
    }
}

module.exports = withAuth;