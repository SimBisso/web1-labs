import {createTask, getTasks} from "./TaskRepository.js";

const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const saveButton = document.getElementById('save-task');
const userIdHeader = document.getElementById('user-id');

const userId = 'f641e1b1-9d79-4e11-80dd-3644474211d8';


const renderTask = (task) => {
    taskList.insertAdjacentHTML('beforeend', `
    <li class="todo-item" data-key="${task.id}" id="${task.id}">
      <span>${task.name}</span>
      <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
      </button>
    </li>
  `)
};


if (!!userId) {
    userIdHeader.innerText = 'Current user : ' + userId;
}

let allTasks = getTasks(userId)

console.log(allTasks);

allTasks.forEach(task => renderTask(task));

const removeTaskFromList = (taskId) => {
    const task = document.getElementById(taskId);
    taskList.removeChild(task);
    allTasks = allTasks.filter(task => task.id !== taskId);
};

taskList.addEventListener('click', event => {
    if (event.target.classList.contains('js-delete-todo')) {
        const taskId = event.target.parentElement.dataset.key;
        deleteTask(taskId);
        removeTaskFromList(taskId);
    }
});

saveButton.addEventListener('click', () => {
    const input = taskInput.value;
    createTask(userId, input)
        .then(task => {
            allTasks.push(task);
            renderTask(task);
        })
        .catch(err => alert("Erreur lors de la sauvegarde de la tâche : " + err.message))
});

