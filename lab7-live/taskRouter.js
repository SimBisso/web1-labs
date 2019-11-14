const express = require('express');
const generateUUID = require('uuid/v4');

taskRouter = express.Router();
users = [];

taskRouter.post('/users', (_, res) => {
    const id = generateUUID();
    users.push({id, tasks: []})

    return res.status(200).send(JSON.stringify({id}))
});

taskRouter.post('/:userId/tasks', (req, res) => {
    const userId = req.params.userId;
    const task = req.body;
    validateUserId(userId, res, () => {
        validateTask(task, res, () => {
            const newTask = {id: generateUUID(), name: task.name};
            users.find( user => userId === user.id )
                .tasks
                .push(newTask);
            console.log(JSON.stringify(users));
            return res.status(200).send(newTask);
        })
    })
});

taskRouter.get('/:userId/tasks', (req, res) => {
    const userId = req.params.userId;
    validateUserId(userId, res, () => {
        const tasks = users.find( user => userId === user.id)
            .tasks;

        res.send(JSON.stringify(tasks));
    })
});

taskRouter.put('/:userId/tasks/:taskId', (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const updatedTask = req.body;

    validateUserId(userId, res, () => {
        validateUpdateRequest(updatedTask, res, () => {
            users.find(user => user.id === userId)
                .tasks
                .find(task => task.id === taskId)
                .name = updatedTask.name;
        })
    })
});

taskRouter.delete('/:userId/tasks/:taskId', (req, res) => {
    const { userId, taskId } = req.params;
    validateUserId(userId, res, () => {
        const tasks = users.find(user => userId === user.id)
            .tasks;

        users.find(user => userId === user.id)
            .tasks = tasks.filter( task => task.id !== taskId);
    })
});

const validateUserId = (userId, res, next) => {
    if (users.some( user => user.id === userId)) {
        return next();
    }
    res.status(400).send(`User with id : ${userId} does not exist`)
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
