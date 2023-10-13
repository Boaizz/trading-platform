const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require("./../configs/JwtConfig").TOKEN_SECRET;

exports.generateAccessToken = (id,email) => {
    return jwt.sign({id: id, email: email}, TOKEN_SECRET, { expiresIn: '7d' });
}

