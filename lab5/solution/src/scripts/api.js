const USER_ID = 'd31786a0-d4ed-4269-b36a-4029c836507a';
const BASE_URL = `https://glo3102lab4.herokuapp.com/${USER_ID}`;

export const createTask = (taskName) => {
    return fetch(`${BASE_URL}/tasks`,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: taskName
            })
        })
        .then( response => response.json())
        .then( json => json)
        .catch( err => {
            alert("Cannot create task : " + err.message)
        })
};
export const getTasks = () => {
    return fetch(`${BASE_URL}/tasks`)
        .then( response => response.json())
        .then( json => {
            return json.tasks
        })
};

export const deleteTask = (taskId) => {
    return fetch(`${BASE_URL}/tasks/${taskId}`,
        {
            method: 'DELETE',
        })
        .catch(err => {
            console.log(err.message)
            alert("Cannot delete task : " + err.message)
        })
};

export const updateTask = (taskId, newName) => {
    return fetch(`${BASE_URL}/tasks/${taskId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName
            })
        })
        .then( response => response.json())
        .then( task => task)
        .catch(err => {
            console.log(err.message);
            alert("Unable to update task : " + err.message)
        })
};
