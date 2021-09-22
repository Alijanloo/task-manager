"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setEnvironment = setEnvironment;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setEnvironment(app) {
  if (process.env.NODE_ENV === 'production ') {
    setProdEnv(app);
  } else {
    setDevEnv(app);
  }
}

function setDevEnv(app) {
  process.env.DB_URL = 'mongodb://localhost:27017/dev-db';
  process.env.TOKEN_SECRET = 'my-development-secret';
  process.env.NODE_ENV = 'development';
  app.use((0, _cors.default)());
  app.use((0, _morgan.default)('dev'));
  app.use(_bodyParser.default.json());
}

function setProdEnv(app) {
  process.env.DB_URL = 'mongodb+srv://username:password@cluster0.pdxnw.mongodb.net/prod-db';
  process.env.TOKEN_SECRET = 'my-production-secret';
  process.env.NODE_ENV = 'production';
  app.use(_bodyParser.default.json());
  app.use(_express.default.static(__dirname + '/../../dist'));
}