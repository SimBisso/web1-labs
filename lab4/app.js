import { getTasks, deleteTask, updateTask, createTask } from './api.js'
const taskWrapper = document.getElementById('tasks');
const textInput = document.getElementById('task-input');
const saveButton = document.getElementById('save-task');

let tasks = [];

saveButton.addEventListener('click', () => {
   const taskName = textInput.value;
   createTask(taskName)
       .then( newTask => {
           textInput.value = '';
           tasks.push(newTask);

           renderTasks(tasks);
    })
});
const renderTasks = (tasks) => {
    const tasksFragment = document.createDocumentFragment();

    tasks.forEach( (task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';

        const inputElement = document.createElement('input');
        inputElement.value = task.name;

        taskElement.appendChild(inputElement);

        const saveButton = document.createElement('button');
        saveButton.type = 'button';
        saveButton.textContent = 'Save';

        saveButton.onclick= () => {
            const name = inputElement.value;
            updateTask(task.id, name)
                .then( () => {
                    tasks[index].name = name;
                    renderTasks(tasks)
                })
        };

        taskElement.appendChild(saveButton);

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';

        deleteButton.onclick = () => {
            deleteTask(task.id)
                .then( () => {
                    tasks.splice(index, 1);
                    renderTasks(tasks);
                })
        };

        taskElement.appendChild(deleteButton);

        tasksFragment.appendChild(taskElement);
    });

    taskWrapper.innerHTML = '';

    taskWrapper.appendChild(tasksFragment);
};

getTasks().then( response => {
    tasks = response;
    renderTasks(tasks);
});
