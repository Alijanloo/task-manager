"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.trim.js");

class StringUtil {
  static isEmpty(str) {
    return !str || !str.trim();
  }

  static capitalize(str) {
    return str.charAt(0).toUpperCase();
  }

}

exports.default = StringUtil;