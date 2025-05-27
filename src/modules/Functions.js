import { readFromLocalStorage, saveToLocalStorage } from './LocalStorage.js';
import { removeTaskFromList, updateTaskOnList, addTaskToList, sortTheList } from './Visuals.js';

const LS_KEY = 'OPSS2_todos';

const Task = (name, status='pending') => {
    return {
        id: crypto.randomUUID(),
        name: name,
        status: status,
        timestamp: new Date().toLocaleString()
    };
};

const tasks = readFromLocalStorage();

const removeTask = (id) => {
    const index = tasks.findIndex(x => x.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        saveToLocalStorage(tasks);
        removeTaskFromList(id);
        sortTheList(tasks);
    }
};

const changeTaskStatus = (id, status = undefined) => {
    const task = tasks.find(x => x.id == id);
    if (task) {
        if (status) {
            task.status = status;
            return;
        }
        task.status = task.status === 'pending' ? 'done' : 'pending';
        saveToLocalStorage(tasks);
        updateTaskOnList(task);
        sortTheList(tasks);
    }
};

const addNewTask = (taskName) => {
    const task = Task(taskName);
    tasks.push(task);
    addTaskToList(task);
    saveToLocalStorage(tasks);
    sortTheList(tasks);
};

document.querySelector('#add_task').onclick = () => {
    const taskInput = document.querySelector('#task_content');
    addNewTask(taskInput.value);
    taskInput.value = '';
};

document.querySelector('#save_task_changes').onclick = () => {
    const taskContent = document.querySelector('#edit_task_content').value;
    const task = tasks.find(x => x.id === currentTaskId);
    if (task) {
        task.name = taskContent;
        task.timestamp = new Date().toLocaleString();
        saveToLocalStorage(tasks);
        updateTaskOnList(task);
        const editTaskModal = bootstrap.Modal.getInstance(document.querySelector('#editTaskModal'));
        editTaskModal.hide();
    }
};

// INIT:
tasks.forEach(x => {
    addTaskToList(x);
});

export { removeTask, changeTaskStatus, addNewTask };
