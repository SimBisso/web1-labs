const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/LAB10', 
    { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;

taskRouter = express.Router();

const Task = require('./model/task.js').model;
const User = require('./model/user.js').model;

const SERVICE_UNAVAILABLE = 503;

taskRouter.post('/users', (_, res) => {
    const user = new User();

    user.save((err, user) => {
        if (!!err) {
            console.error('Error while creating user in database : ' + err)
            return res.sendStatus(SERVICE_UNAVAILABLE);
        }
        console.log('Creating user with id : ' + user._id);
        return res.status(201).send(JSON.stringify({id: user._id}))
    })
});

taskRouter.post('/:userId/tasks', (req, res) => {
    const userId = req.params.userId;
    validateUserId(userId, res, () => {
        validateTask(req.body, res, () => {
            const task = new Task({name: req.body.name, userId})
            task.save( (err, task) => {
                if (!!err) {
                    console.error('Error while creating task in database : ' + err)
                    return res.sendStatus(SERVICE_UNAVAILABLE);
                }
                console.log('Created task in database with id : ' + task._id)
                return res.status(201).send(JSON.stringify(task.toDTO()));
            })
        })
    })
});

taskRouter.get('/:userId/tasks', (req, res) => {
    const userId = req.params.userId;
    validateUserId(userId, res, () => {
        Task.find({userId}, (err, tasks) => {
            if (!!err) {
                console.error('Error while getting all tasks in database : ' + err)
                return res.sendStatus(SERVICE_UNAVAILABLE);
            }
            tasks = tasks || [];
            tasks = tasks.map((task) => task.toDTO());
            console.log('Fetching all tasks from database')
            return res.status(200).send(JSON.stringify({tasks}));
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
                    return res.status(404).send(`Task with id : ${taskId} does not exist.`);
                }
                if (!!err) {
                    console.error('Error while getting task in database : ' + err)
                    return res.sendStatus(SERVICE_UNAVAILABLE);
                }
                task.name = updatedTask.name;
                task.save((err, task) => {
                    if (!!err) {
                        console.error('Error while modifying task in database : ' + err)
                        return res.sendStatus(SERVICE_UNAVAILABLE)
                    }
                    console.log('Modifyed task in database with id : ' + taskId);
                    return res.sendStatus(200);
                })
            })
        })
    })
});

taskRouter.delete('/:userId/tasks/:taskId', (req, res) => {
    const { userId, taskId } = req.params;
    validateUserId(userId, res, () => {
        Task.findByIdAndRemove(taskId, (err, task) => {
            console.log
            if (!task) {
                return res.sendStatus(404);
            }
            if (!!err) {
                console.error('Error while deleting task in database : ' + err)
                return res.sendStatus(SERVICE_UNAVAILABLE);
            }
            console.log('Deleted task in database with id : ' + taskId);
            return res.sendStatus(200);
        })
    })
});

const validateUserId = (userId, res, next) => {
    User.findById(userId, (err, user) => {
        if (!user) {
            res.status(404).send(`User with id : ${userId} does not exist`)
        }
        if (!!err) {
            console.error('Error while getting user in database : ' + err)
            return res.sendStatus(SERVICE_UNAVAILABLE)
        }
        next()
    })
};

const validateTask = (task, res, next) => {
    if (!!task && !!task.name && task.name !== '') {
        return next();
    }
    res.status(400).send(`Task definition is not valid`)
};

const validateUpdateRequest = (updatedTask, res, next) => {
    if (!!updatedTask && !!updatedTask.name && updatedTask.name !== '') {
        return next();
    }
    res.status(400).send('Bad update request');
};

module.exports = taskRouter;
