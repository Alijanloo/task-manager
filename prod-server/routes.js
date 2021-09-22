"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = registerRoutes;

var _taskRoutes = _interopRequireDefault(require("./api/tasks/taskRoutes.js"));

var _authRoutes = _interopRequireDefault(require("./api/auth/authRoutes.js"));

var _registerRoutes = _interopRequireDefault(require("./api/register/registerRoutes.js"));

var _userRoutes = _interopRequireDefault(require("./api/user/userRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerRoutes(app) {
  app.use('/api', _taskRoutes.default);
  app.use('/api', _authRoutes.default);
  app.use('/api', _registerRoutes.default);
  app.use('/api', _userRoutes.default);
}