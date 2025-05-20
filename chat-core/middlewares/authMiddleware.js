const jwt = require('jsonwebtoken');
const secret = require('../keys/secret-key.js').secretKey;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get the token after "Bearer"

  if (!token) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user; // userId, email, etc.
    next();
  });
}

module.exports = authenticateToken;
