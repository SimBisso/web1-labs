const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};
const _ = require('underscore');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LAB10', { useMongoClient: true });
mongoose.Promise = global.Promise;

const Task = require('./task.js').model;
const User = require('./user.js').model;

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        res.status(400).send({
            errorCode: 'PARSE_ERROR',
            message: 'Arguments could not be parsed, make sure request is valid.'
        });
    } else {
        res.status(500).send('Something broke server-side.', error);
    }
});

app.get('/', function(req, res) {
    res.send('Welcome to Lab 4 API.');
});

app.post('/users', function(req, res) {
    const user = new User();

    user.save(function (err, user) {
        if (err) {
            return res.sendStatus(500);
        }

        return res.status(200).send(JSON.stringify({'id': user._id}));
    });
});

app.get('/:userId/tasks', function(req, res) {
    const userId = req.params.userId;

    ensureUserExist(userId, res, function() {
        Task.find({userId: userId}, function(err, tasks) {
            tasks = tasks || [];
            
            let results = _.map(tasks, function(task) { return task.toDTO(); });
            return res.status(200).send(JSON.stringify({'tasks': results}));
        });
    });
});

app.post('/:userId/tasks', function(req, res) {
    const userId = req.params.userId;

    ensureUserExist(userId, res, function() {
        ensureValidTask(req.body, res, function() {
            const task = new Task({name: req.body.name, userId: userId});
            task.save(function (err, task) {
                if (err) {
                    return res.sendStatus(500);
                }
                
                return res.status(200).send(JSON.stringify(task.toDTO()));
            });
        });
    });

});

app.put('/:userId/tasks/:taskId', function(req, res) {
    const taskId = req.params.taskId;
    const userId = req.params.userId;

    ensureUserExist(userId, res, function() {
        ensureValidTask(req.body, res, function() {
            Task.findById(taskId, function (err, task) {
                if (_.isUndefined(task)) {
                    return res.status(400).send('Task with id \'' + taskId + '\' doesn\'t exist.');
                } else {
                    task.name = req.body.name;
                    task.save(function (err, task) {
                        if (err) {
                            return res.sendStatus(500);
                        }
                        
                        return res.status(200).send(JSON.stringify(task.toDTO()));
                    });
                }
            });
        });
    });
});

app.delete('/:userId/tasks/:taskId', function(req, res) {
    const taskId = req.params.taskId;
    const userId = req.params.userId;

    ensureUserExist(userId, res, function() {
        Task.findOneAndRemove(taskId, function (err, task) {
            if (_.isUndefined(task)) {
                return res.status(400).send('Task with id \'' + taskId + '\' doesn\'t exist.');
            } else {
                return res.sendStatus(204);
            }
        });
    });
});

app.listen(port, function() {
    console.log('Server listening.')
});

function ensureValidTask(task, res, callback) {
    if (task.name === undefined || task.name === '') {
        return res.status(400).send('Task definition is invalid.');
    }

    callback();
}

function ensureUserExist(userId, res, callback) {
    User.findById(userId, function (err, user) {
        if (_.isUndefined(user)) {
            return res.status(400).send('User with id \'' + userId + '\' doesn\'t exist.');
        } else {
            callback();
        }
    });
}

function getUserTasks(userId) {
    Task.find({userId: userId}, function(err, tasks) {
        tasks = tasks || [];
        
        return _.map(tasks, function(task) { return task.toDTO(); });
    });
};