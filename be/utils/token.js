const jwt = require('jsonwebtoken');

exports.createAccessToken = (id, secretValue) => {
    return jwt.sign({ id }, secretValue, {
        expiresIn: '2h'
    });
}
exports.createRefreshToken = (id, secretValue) => {
    return jwt.sign({ id }, secretValue, {
        expiresIn: '2d'
    });
}