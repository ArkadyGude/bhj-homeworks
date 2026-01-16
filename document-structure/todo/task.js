document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tasks__form');
    const input = document.getElementById('task__input');
    const tasksList = document.getElementById('tasks__list');

    const STORAGE_KEY = 'todo_tasks';

    function loadTasks() {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(taskText => {
                const task = createTask(taskText);
                tasksList.appendChild(task);
            });
        }
    }

    function saveTasks() {
        const tasks = [];
        const taskElements = tasksList.querySelectorAll('.task__title');
        taskElements.forEach(element => {
            tasks.push(element.textContent);
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    function createTask(text) {
        const task = document.createElement('div');
        task.className = 'task';
        
        const title = document.createElement('div');
        title.className = 'task__title';
        title.textContent = text;
        
        const removeBtn = document.createElement('a');
        removeBtn.href = '#';
        removeBtn.className = 'task__remove';
        removeBtn.innerHTML = '&times;';
        
        task.appendChild(title);
        task.appendChild(removeBtn);
        
        return task;
    }

    function addTask(taskText) {
        if (taskText.trim() === '') return;
        
        const task = createTask(taskText);
        tasksList.appendChild(task);
        input.value = '';
        saveTasks();
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(input.value);
    });

    tasksList.addEventListener('click', function(event) {
        if (event.target.classList.contains('task__remove')) {
            event.preventDefault();
            const task = event.target.closest('.task');
            if (task) {
                task.remove();
                saveTasks();
            }
        }
    });

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask(input.value);
        }
    });
    loadTasks();
});