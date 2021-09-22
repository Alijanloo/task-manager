"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _stringUtil = _interopRequireDefault(require("../utilities/string-util.js"));

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  username: String,
  first: String,
  last: String,
  password: String
});
userSchema.set('timestamps', true);

userSchema.statics.passwordMatches = function (password, hash) {
  return _bcryptNodejs.default.compareSync(password, hash);
};

userSchema.virtual('fullName').get(function () {
  const first = _stringUtil.default.capitalize(this.first.toLowerCase());

  const last = _stringUtil.default.capitalize(this.last.toLowerCase());

  return "".concat(first, " ").concat(last);
});
userSchema.pre('save', function (next) {
  this.username = this.username.toLowerCase();
  this.first = this.first.toLowerCase();
  this.last = this.last.toLowerCase();
  this.password = _bcryptNodejs.default.hashSync(this.password);
  next();
});

const model = _mongoose.default.model('user', userSchema);

var _default = model;
exports.default = _default;