"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;

var _stringUtil = _interopRequireDefault(require("../../utilities/string-util.js"));

var _userModel = _interopRequireDefault(require("../../model/user-model.js"));

var _authService = require("../../services/auth-service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
  console.log(req.headers);
  const validate = validateIndex(req.body);
  if (!validate.isValid) return res.status(400).json({
    message: validate.message
  });

  _userModel.default.findOne({
    username: req.body.username.toLowerCase()
  }, (error, user) => {
    if (error) {
      return res.status(500).json();
    }

    if (!user) {
      return res.status(404).json();
    }

    const passwordMatch = _userModel.default.passwordMatches(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(401).json();
    }

    const token = (0, _authService.generateToken)(user);
    res.status(200).json({
      token: token
    });
  });
}

function validateIndex(body) {
  let error = '';

  if (_stringUtil.default.isEmpty(body.username)) {
    error += 'the username field cannot be empty!';
  }

  if (_stringUtil.default.isEmpty(body.password)) {
    error += 'the password field cannot be empty!';
  }

  return {
    isValid: _stringUtil.default.isEmpty(error),
    message: error
  };
}