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
    
        taskList.appendChild(taskElement);
        setTimeout(() => {
            taskElement.style.opacity = "1";
            taskElement.style.transform = "translateY(0)";
        }, 10);
    
        taskElement.querySelector(".delete-btn").addEventListener("click", () => {
            taskElement.style.opacity = "0";
            taskElement.style.transform = "translateY(-10px)";
            setTimeout(() => taskElement.remove(), 400); 
        });
    
        taskInput.value = "";
        taskInput.focus();
    }    
});
