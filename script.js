document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    };

    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const getTasks = () => {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    };

    const addTask = (task) => {
        const tasks = getTasks();
        tasks.push(task);
        saveTasks(tasks);
        addTaskToDOM(task);
    };

    const updateTask = (index, updatedTask) => {
        const tasks = getTasks();
        tasks[index] = updatedTask;
        saveTasks(tasks);
        renderTasks();
    };

    const deleteTask = (index) => {
        let tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
    };

    const toggleCompleteTask = (index) => {
        const tasks = getTasks();
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        renderTasks();
    };

    const addTaskToDOM = (task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="complete-btn">✔</button>
                <button class="edit-btn">✏</button>
                <button class="delete-btn">✖</button>
            </div>
        `;
        li.querySelector('.complete-btn').addEventListener('click', () => toggleCompleteTask(index));
        li.querySelector('.edit-btn').addEventListener('click', () => editTask(index));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
        taskList.appendChild(li);
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        const tasks = getTasks();
        tasks.forEach((task, index) => addTaskToDOM(task, index));
    };

    const editTask = (index) => {
        const tasks = getTasks();
        const newTaskText = prompt('Edit task:', tasks[index].text);
        if (newTaskText !== null) {
            tasks[index].text = newTaskText;
            saveTasks(tasks);
            renderTasks();
        }
    };

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask({ text: taskText, completed: false });
            taskInput.value = '';
        }
    });

    loadTasks();
});
