document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const prioritySelect = document.getElementById("priority");
    const taskList = document.getElementById("taskList");

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

        const taskElement = document.createElement("li");
        taskElement.classList.add("task-item", priority.toLowerCase()); 
        taskElement.innerHTML = `
            <span>${taskText} - <strong>${priority}</strong></span>
            <button class="delete-btn">[x]</button>
        `;

        taskElement.querySelector(".delete-btn").addEventListener("click", () => {
            taskElement.remove();
        });

        taskList.appendChild(taskElement);

        taskInput.value = "";
        taskInput.focus();
    }
});
