document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('taskForm').addEventListener('submit', addTask);
});

function openTaskForm(column) {
    document.getElementById('taskColumn').value = column;
    $('#taskFormModal').modal('show');
}

function addTask(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskColumn = document.getElementById('taskColumn').value;

    const task = document.createElement('div');
    task.className = 'task';
    task.draggable = true;
    task.ondragstart = drag;
    task.id = 'task' + new Date().getTime(); 
    task.innerHTML = `<h5>${taskTitle}</h5><p>${taskDescription}</p>`;

    document.getElementById(taskColumn).appendChild(task);

    $('#taskFormModal').modal('hide');
    document.getElementById('taskForm').reset();
}

function allowDrop(event) {
    event.preventDefault(); // Allow the drop by preventing the default behavior
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id); // Store the dragged element's ID
    event.dataTransfer.setData("origin", event.target.parentElement.id); // Store the origin column's ID
}

function drop(event) {
    event.preventDefault(); // Prevent the default behavior (e.g., opening as a link)
    const taskId = event.dataTransfer.getData("text"); // Retrieve the stored ID
    const originColumn = event.dataTransfer.getData("origin"); // Retrieve the origin column's ID
    const taskElement = document.getElementById(taskId); // Get the dragged element

    // Prevent tasks in the "Done" column from being moved
    if (originColumn === "done") {
        return;
    }

    // Prevent tasks in the "In Progress" column from being moved to the "TODO" column
    if (originColumn === "inprogress" && event.target.id === "todo") {
        return;
    }

    // Allow drop if the target is a valid drop zone
    if (event.target.classList.contains('card-body')) {
        event.target.appendChild(taskElement); // Move the element to the new location
    }
}

