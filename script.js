document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const prioritySelect = document.getElementById("priority");
    const taskList = document.getElementById("taskList");

    let allTodos = getTodos();
    renderTodos();

    addTaskBtn.addEventListener("click", addTodo);

    taskInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") addTodo();
    });

    function addTodo() {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;
    
        if (!taskText) {
            alert("Please enter a valid task.");
            return;
        }

        const newTask = { text: taskText, priority: priority };
        allTodos.push(newTask);
        saveData();

        createTaskElement(newTask);
    
        taskInput.value = "";
        taskInput.focus();
    }

    function createTaskElement(task) {
        const taskElement = document.createElement("li");
        taskElement.classList.add("task-item", task.priority.toLowerCase());
    
        taskElement.innerHTML = `
            <span>${task.text} - <strong>${task.priority}</strong></span>
            <button class="delete-btn">[x]</button>
        `;

        taskList.appendChild(taskElement);

        setTimeout(() => {
            taskElement.style.opacity = "1";
            taskElement.style.transform = "translateY(0)";
        }, 10);

        taskElement.querySelector(".delete-btn").addEventListener("click", () => {
            removeTodo(task, taskElement);
        });
    }

    function removeTodo(task, element) {
        element.style.opacity = "0";
        element.style.transform = "translateY(-10px)";
        setTimeout(() => {
            element.remove();
            allTodos = allTodos.filter(t => t.text !== task.text || t.priority !== task.priority);
            saveData();
        }, 400);
    }

    function saveData() {
        localStorage.setItem("toDo", JSON.stringify(allTodos));
    }

    function getTodos() {
        return JSON.parse(localStorage.getItem("toDo")) || [];
    }

    function renderTodos() {
        allTodos.forEach(task => createTaskElement(task));
    }
});
