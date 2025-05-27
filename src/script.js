import * as bootstrap from 'bootstrap';

import { Task, removeTask, changeTaskStatus, addNewTask, editTask } from './modules/Functions.js';
import { addTaskToList, updateTaskOnList, removeTaskFromList, sortTheList } from './modules/Visuals.js';
import { readFromLocalStorage, saveToLocalStorage } from './modules/LocalStorage.js';

const tasks = readFromLocalStorage(LS_KEY);

tasks.forEach(task => addTaskToList(task));
