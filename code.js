document.addEventListener('DOMContentLoaded', function() {
    const plusButton = document.getElementById('plus_button');
    const titleInput = document.getElementById('title_input');
    const blockTasks = document.getElementById('block_tasks');
    const allButton = document.getElementById('all_button');
    const doneButton = document.getElementById('done_button');
    const notDoneButton = document.getElementById('notDone_button');

    let currentFilter = 'all';

    plusButton.addEventListener('click', function() {
        const taskText = titleInput.value.trim();
        
        if (taskText) {
            addTask(taskText);
            titleInput.value = '';
            applyFilter(currentFilter);
        }
    });

    allButton.addEventListener('click', function() {
        setActiveFilter('all');
        applyFilter('all');
    });

    doneButton.addEventListener('click', function() {
        setActiveFilter('done');
        applyFilter('done');
    });

    notDoneButton.addEventListener('click', function() {
        setActiveFilter('notDone');
        applyFilter('notDone');
    });

    blockTasks.addEventListener('click', function(e) {
        if (e.target.closest('.delete_button')) {
            const taskElement = e.target.closest('.block_task');
            taskElement.remove();
        }
        
        if (e.target.closest('.edit_button')) {
            const taskElement = e.target.closest('.block_task');
            const taskInput = taskElement.querySelector('.task_input');
            
            if (taskInput.readOnly) {
                taskInput.readOnly = false;
                taskInput.focus();
            } 
        }
    });

    blockTasks.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.classList.contains('task_input') && !e.target.readOnly) {
            e.target.readOnly = true;
        }
    });

    blockTasks.addEventListener('click', function(e) {
        if (e.target.classList.contains('task_input') && e.target.readOnly) {
            const taskElement = e.target.closest('.block_task');
            taskElement.classList.toggle('completed');
            applyFilter(currentFilter);
        }
    });

    blockTasks.addEventListener('focusout', function(e) {
        if (e.target.classList.contains('task_input') && !e.target.readOnly) {
            e.target.readOnly = true;
        }
    });

    function addTask(text) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'block_row block_task';
        taskDiv.innerHTML = `
            <input type="text" class="task_input" value="${text}" readonly>
            <div class="block_task_buttons">
                <button class="task_button edit_button">
                    <img class="task_img" src="Images/pensil_edit.jpeg" alt="edit">
                </button>
                <button class="task_button delete_button">
                    <img class="task_img" src="Images/musorka_img.png" alt="delete">
                </button>
            </div>
        `;
        blockTasks.appendChild(taskDiv);
    }

    function setActiveFilter(filter) {
        currentFilter = filter;
        
        allButton.classList.remove('filter_button_on');
        allButton.classList.add('filter_button_off');
        doneButton.classList.remove('filter_button_on');
        doneButton.classList.add('filter_button_off');
        notDoneButton.classList.remove('filter_button_on');
        notDoneButton.classList.add('filter_button_off');
        
        switch(filter) {
            case 'all':
                allButton.classList.remove('filter_button_off');
                allButton.classList.add('filter_button_on');
                break;
            case 'done':
                doneButton.classList.remove('filter_button_off');
                doneButton.classList.add('filter_button_on');
                break;
            case 'notDone':
                notDoneButton.classList.remove('filter_button_off');
                notDoneButton.classList.add('filter_button_on');
                break;
        }
    }

    function applyFilter(filter) {
        const tasks = blockTasks.querySelectorAll('.block_task');
        
        tasks.forEach(task => {
            const isCompleted = task.classList.contains('completed');
            
            switch(filter) {
                case 'all':
                    task.style.display = 'flex';
                    break;
                case 'done':
                    task.style.display = isCompleted ? 'flex' : 'none';
                    break;
                case 'notDone':
                    task.style.display = !isCompleted ? 'flex' : 'none';
                    break;
            }
        });
    }
});