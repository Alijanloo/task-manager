"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;

var _stringUtil = _interopRequireDefault(require("../../utilities/string-util.js"));

var _userModel = _interopRequireDefault(require("../../model/user-model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
  const validate = validateIndex(req.body);
  if (!validate.isValid) return res.status(400).json({
    message: validate.message
  });
  const user = new _userModel.default({
    username: req.body.username,
    password: req.body.password,
    first: req.body.first,
    last: req.body.last
  });
  user.save(error => {
    if (error) {
      if (error.code === 11000) {
        return res.status(403).json({
          message: 'Username is already taken!'
        });
      }

      console.log(error);
      return res.status(500).json();
    }

    return res.status(201).json();
  });
}

function validateIndex(body) {
  var error = '';

  if (_stringUtil.default.isEmpty(body.username)) {
    error += 'the username field cannot be empty!';
  }

  if (_stringUtil.default.isEmpty(body.password)) {
    error += 'the password field cannot be empty!';
  }

  if (_stringUtil.default.isEmpty(body.first)) {
    error += 'the first name field cannot be empty!';
  }

  if (_stringUtil.default.isEmpty(body.last)) {
    error += 'the last name field cannot be empty!';
  }

  return {
    isValid: _stringUtil.default.isEmpty(error),
    message: error
  };
}