"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = generateToken;
exports.requireLogin = requireLogin;
exports.decodeToken = decodeToken;
exports.getUsername = getUsername;
exports.getId = getId;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateToken(user) {
  const userToken = {
    username: user.username,
    id: user._id
  };
  return _jsonwebtoken.default.sign({
    user: userToken
  }, process.env.TOKEN_SECRET);
}

function requireLogin(req, res, next) {
  const token = decodeToken(req);

  if (!token) {
    return res.status(401).json({
      message: 'You must be logged in.'
    });
  }

  next();
}

function decodeToken(req) {
  const token = req.headers.authorization || req.headers['authorization'];

  if (!token) {
    return null;
  }

  try {
    return _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    return null;
  }
}

function getUsername(req) {
  const token = decodeToken(req);

  if (!token) {
    return null;
  }

  return token.user.username;
}

function getId(req) {
  const token = decodeToken(req);

  if (!token) {
    return null;
  }

  return token.user.id;
}