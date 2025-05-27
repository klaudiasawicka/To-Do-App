import * as bootstrap from 'bootstrap';
import { changeTaskStatus, removeTask } from './Functions.js';

const task_list = document.querySelector('#task_list');
const task_template = document.querySelector('.task_item');

const removeTaskFromList = (id) => {
    document.getElementById(id).remove();
};

const updateTaskOnList = (task) => {
    const taskItem = document.getElementById(task.id);
    if (taskItem) {
        taskItem.querySelector('.task_status').innerText = task.status;
        taskItem.querySelector('.task_text').innerText = task.name;
        taskItem.querySelector('.task_timestamp').innerText = task.timestamp;
        taskItem.className = 'list-group-item task_' + task.status;
    }
};

const addTaskToList = (task) => {
    const task_entry = document.createElement('li');
    task_entry.id = task.id;
    task_entry.className = 'list-group-item task_' + task.status;
    task_entry.classList.add('list-group-item');
    const task_item = task_template.cloneNode(true);

    task_item.querySelector('.task_text').innerText = task.name;
    task_item.querySelector('.task_status').innerText = task.status;
    task_item.querySelector('.task_timestamp').innerText = task.timestamp;
    task_item.querySelector('.change_task_status').onclick = () => {
        changeTaskStatus(task.id);
    };
    task_item.querySelector('.remove_task').onclick = () => {
        removeTask(task.id);
    };
    task_item.querySelector('.edit_task').onclick = () => {
        currentTaskId = task.id;
        document.querySelector('#edit_task_content').value = task.name;
        const editTaskModal = new bootstrap.Modal(document.querySelector('#editTaskModal'));
        editTaskModal.show();
    };
    task_item.style.display = 'flex';

    task_entry.append(task_item);
    task_list.append(task_entry);
};

const sortTheList = (tasks) => {
    task_list.innerHTML = '';
    const sortedTasks = tasks.sort((a, b) => {
        if (a.status === 'pending' && b.status === 'done') return -1;
        if (a.status === 'done' && b.status === 'pending') return 1;
        return new Date(a.timestamp) - new Date(b.timestamp);
    });
    sortedTasks.forEach(task => addTaskToList(task));
};

export { removeTaskFromList, updateTaskOnList, addTaskToList, sortTheList };
