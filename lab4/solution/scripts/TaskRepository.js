import { apiPost, apiGet } from "./api.js";

const BASE_URL = 'https://glo3102lab4.herokuapp.com/';
const TASK_URL = '/tasks';

export const getTasks = async (userId) => {
    await apiGet(BASE_URL + userId + TASK_URL)
        .then( res => {
            console.log(res)
        })
};

export const createTask = async (userId, taskName) => {
    const newTask = {
        name: taskName
    };
    return apiPost(BASE_URL + userId + TASK_URL, newTask);
};