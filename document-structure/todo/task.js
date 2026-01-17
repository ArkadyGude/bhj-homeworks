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
                addTaskToDOM(taskText, false);
            });
        }
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task__title').forEach(element => {
            tasks.push(element.textContent.trim());
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    function addTaskToDOM(taskText, save = true) {
        if (taskText.trim() === '') return;
        
        tasksList.insertAdjacentHTML('beforeend', `
            <div class="task">
                <div class="task__title">
                    ${taskText}
                </div>
                <a href="#" class="task__remove">&times;</a>
            </div>
        `);
        
        if (save) saveTasks();
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        addTaskToDOM(input.value);
        input.value = '';
    });

    tasksList.addEventListener('click', function(event) {
        if (event.target.classList.contains('task__remove')) {
            event.preventDefault();
            event.target.closest('.task').remove();
            saveTasks();
        }
    });

    loadTasks();
});