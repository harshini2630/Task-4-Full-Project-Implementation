const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks on page load
window.onload = renderTasks;
window.onload = function () {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    taskList.innerHTML = stored;
    addEventListeners();
  }
};


// Get tasks from localStorage
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Save tasks to localStorage
function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const tasks = getTasksFromStorage();
  tasks.push({ text: taskText, completed: false });
  saveTasksToStorage(tasks);

  renderTasks();
  taskInput.value = "";
}

// Render tasks
function renderTasks() {
  const tasks = getTasksFromStorage();
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="task-text ${task.completed ? "task-completed" : ""}" ondblclick="editTask(${index})">${task.text}</span>
      <div class="task-actions">
        <button onclick="toggleTask(${index})">✅</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Toggle complete/incomplete
function toggleTask(index) {
  const tasks = getTasksFromStorage();
  tasks[index].completed = !tasks[index].completed;
  saveTasksToStorage(tasks);
  renderTasks();
}

// Delete a task
function deleteTask(index) {
  const tasks = getTasksFromStorage();
  tasks.splice(index, 1);
  saveTasksToStorage(tasks);
  renderTasks();
}

// Edit a task
function editTask(index) {
  const tasks = getTasksFromStorage();
  const li = taskList.children[index];
  const span = li.querySelector(".task-text");

  const input = document.createElement("input");
  input.type = "text";
  input.value = tasks[index].text;
  input.className = "edit-input";

  span.replaceWith(input);
  input.focus();

  input.onblur = () => {
    const updatedText = input.value.trim();
    if (updatedText) {
      tasks[index].text = updatedText;
      saveTasksToStorage(tasks);
      renderTasks();
    } else {
      renderTasks(); // If empty, revert
    }
  };

  input.onkeypress = (e) => {
    if (e.key === "Enter") input.blur();
  };
}

// Clear all
function clearAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    saveTasksToStorage([]);
    renderTasks();
  }
}

// Add task on Enter key
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});
