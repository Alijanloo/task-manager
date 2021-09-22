"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userModel = _interopRequireDefault(require("../../model/user-model.js"));

var _taskModel = _interopRequireDefault(require("../../model/task-model.js"));

var _moment = _interopRequireDefault(require("moment"));

var _authService = require("../../services/auth-service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class taskController {
  static index(req, res) {
    _taskModel.default.find({}, (error, tasks) => {
      if (error) {
        return res.status(500).json();
      }

      res.status(200).json({
        tasks: tasks
      });
    }).populate('author', 'username', 'user');
  }

  static show(req, res) {
    _taskModel.default.findOne({
      _id: req.params.id
    }, (error, task) => {
      if (error) {
        return res.status(500).json();
      }

      if (!task) {
        return res.status(404).json();
      }

      res.status(200).json({
        task: task
      });
    });
  }

  static create(req, res) {
    const id = (0, _authService.getId)(req);

    _userModel.default.findOne({
      _id: id
    }, (error, user) => {
      if (error && !user) {
        return res.status(500).json();
      }

      const task = new _taskModel.default(req.body);
      task.author = user._id;
      task.dueDate = (0, _moment.default)(task.dueDate);
      task.save(err => {
        if (err) {
          return res.status(500).json();
        }

        res.status(201).json();
      });
    });
  }

  static update(req, res) {
    const id = (0, _authService.getId)(req);

    _userModel.default.findOne({
      _id: id
    }, (error, user) => {
      if (error) {
        return res.status(500).json();
      }

      if (!user) {
        return res.status(504).json();
      }

      const task = new _taskModel.default(req.body);
      task.author = user._id;
      task.dueDate = (0, _moment.default)(task.dueDate); // task._id = req.body.id;

      _taskModel.default.findByIdAndUpdate({
        _id: task._id
      }, task, err => {
        if (err) {
          return res.status(500).json();
        }

        return res.status(204).json();
      });
    });
  }

  static delete(req, res) {
    const id = (0, _authService.getId)(req);

    _taskModel.default.findOne({
      _id: req.params.id
    }, (error, task) => {
      if (error) {
        return res.status(500).json();
      }

      if (!task) {
        return res.status(404).json();
      }

      if (task.author._id != id) {
        return res.status(403).json({
          message: 'Not allowed to delete another user\'s tasks.'
        });
      }

      _taskModel.default.deleteOne({
        _id: req.params.id
      }, err => {
        if (err) {
          return res.status(500).json();
        }

        return res.status(204).json();
      });
    });
  }

}

exports.default = taskController;