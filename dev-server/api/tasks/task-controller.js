import User from '../../model/user-model.js';
import Task from '../../model/task-model.js'
import moment from 'moment';
import { getId } from '../../services/auth-service'

export default class taskController {
  static index(req, res) {

    Task.find({}, (error, tasks) => {
      if(error) {
        return res.status(500).json();
      }
      res.status(200).json({ tasks: tasks});
    }).populate('author', 'username', 'user');
  }
  static show(req, res) {
    Task.findOne({ _id: req.params.id}, (error, task) => {
      if(error) {
        return res.status(500).json();
      }
      if(!task) {
        return res.status(404).json();
      }
      res.status(200).json({ task: task});
    })
  }
  static create(req, res) {
    const id = getId(req);
    User.findOne({ _id: id}, (error, user) => {
      if(error && !user) {
        return res.status(500).json();
      }
      const task = new Task(req.body);
      task.author = user._id;
      task.dueDate = moment(task.dueDate);

      task.save(err => {
        if(err) {
          return res.status(500).json();
        }
        res.status(201).json();
      })
    })
  }
  static update(req, res) {
    const id = getId(req);
    User.findOne({ _id: id}, (error, user) => {
      if(error) {
        return res.status(500).json();
      }
      if(!user) {
        return res.status(504).json();
      }
      const task = new Task(req.body);
      task.author = user._id;
      task.dueDate = moment(task.dueDate);
      // task._id = req.body.id;
      Task.findByIdAndUpdate({ _id: task._id}, task, err => {
        if(err) {
          return res.status(500).json();
        }
        return res.status(204).json();
      })
    })
  }
  static delete(req, res) {
    const id = getId(req);
    Task.findOne({ _id: req.params.id}, (error, task) => {
      if(error) {
        return res.status(500).json();
      }
      if(!task) {
        return res.status(404).json();
      }
      if(task.author._id != id) {
        return res.status(403).json({ message: 'Not allowed to delete another user\'s tasks.' })
      }
      Task.deleteOne({ _id: req.params.id}, err => {
        if(err) {
          return res.status(500).json();
        }
        return res.status(204).json();
      })
    })
  }
}
