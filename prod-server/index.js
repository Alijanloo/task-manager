"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes.js"));

var _env = require("./config/env.js");

var _db = require("./config/db.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = 3000;
(0, _env.setEnvironment)(app);
(0, _db.connectToDB)();
(0, _routes.default)(app);
app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile("index.html", {
      root: __dirname + "/../dist/"
    });
  } else {
    res.send("runing on development mod!");
  }
});
app.listen(port, () => {
  console.log("MEVN app listening at http://localhost:".concat(port, " in ").concat(process.env.NODE_ENV, " mode!"));
});