"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;

function index(req, res) {
  return res.status(204).json({
    message: 'in the user controller'
  });
}