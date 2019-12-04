const express = require('express');

taskRouter = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LAB10', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

const Task = require('./model/task.js').model;
const User = require('./model/user.js').model;

taskRouter.post('/users', (_, res) => {
    const user = new User();

    user.save( (err, user) => {
        if (!!err)
            return res.sendStatus(503);
        console.log("Saving user with id : " + user._id)
        return res.status(200).send(JSON.stringify({id: user._id}))
    })
});

taskRouter.post('/:userId/tasks', (req, res) => {
    const userId = req.params.userId;
    const taskRequest = req.body;
    validateUserId(userId, res, () => {
        validateTask(taskRequest, res, () => {
          const task = new Task({name: taskRequest.name, userId: userId});
          task.save((err, task) => {
              if (err) {
                  return res.sendStatus(503);
              }
              
              return res.status(200).send(JSON.stringify(task.toDTO()));
          });
        })
    })
});

taskRouter.get('/:userId/tasks', (req, res) => {
    const userId = req.params.userId;
    validateUserId(userId, res, () => {
      Task.find({userId}, (err, tasks) => {
        if (!!err)
          return res.sendStatus(503);
        tasks = tasks || [];
        tasks = tasks.map((t) => t.toDTO());
        return res.status(200).send(JSON.stringify({tasks}))
      })
    })
});

taskRouter.put('/:userId/tasks/:taskId', (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const updatedTask = req.body;

    validateUserId(userId, res, () => {
        validateUpdateRequest(updatedTask, res, () => {
          Task.findById(taskId, (err, task) => {
            if (!task) {
                return res.status(404).send('Task with id \'' + taskId + '\' doesn\'t exist.');
            }
            if (!!err) {
              console.error(err);
              return res.sendStatus(503);
            }
            task.name = updatedTask.name;
            task.save((err, task) => {
                if (err) {
                    return res.sendStatus(503);
                }
                
                return res.status(200).send(JSON.stringify(task.toDTO()));
            });
        });
        })
    })
});

taskRouter.delete('/:userId/tasks/:taskId', (req, res) => {
    const { userId, taskId } = req.params;
    validateUserId(userId, res, () => {
      console.log(taskId)
      Task.findOneAndRemove(taskId, (err, task) => {
        if (!task) {
          return res.status(404).send('Task with id \'' + taskId + '\' doesn\'t exist.');
        }
        if (!!err) {
          console.error(err);
          return res.sendStatus(503);   
        }
        console.log(task)
        return res.sendStatus(204);
    })
  })
});

const validateUserId = (userId, res, next) => {
  User.findById(userId, (err, user) => {
    if (!user) {
      return res.status(404).send('User with id \'' + userId + '\' doesn\'t exist.');
    }
    if (!!err)
      return res.sendStatus(503);
    next();
  })
;};

const validateTask = (task, res, next) => {
  if (!task.name || !task.name || task.name === '') {
    return res.status(400).send('Task definition is invalid.');
  }

  next();
};

const validateUpdateRequest = (updatedTask, res, next) => {
    if (!!updatedTask && !!updatedTask.name && updatedTask.name !== '') {
        return next();
    }
    res.status(400).send('Bad update request');
};

module.exports = taskRouter;