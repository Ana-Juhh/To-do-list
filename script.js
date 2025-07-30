let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let draggedIndex = null;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.setAttribute("draggable", true);
    li.setAttribute("data-index", index);
    li.className = task.done ? "done" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => toggleTask(index));

    const label = document.createElement("label");
    label.textContent = task.text;

    const btn = document.createElement("button");
    btn.textContent = "✖";
    btn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(btn);

    li.addEventListener("dragstart", dragStart);
    li.addEventListener("dragover", dragOver);
    li.addEventListener("drop", drop);
    li.addEventListener("dragend", dragEnd);

    list.appendChild(li);
  });
  function dragStart(e) {
  draggedIndex = e.target.getAttribute("data-index");
  e.target.style.opacity = "0.5";
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const targetIndex = e.target.closest("li").getAttribute("data-index");

  if (draggedIndex !== null && targetIndex !== null && draggedIndex !== targetIndex) {
    const draggedTask = tasks[draggedIndex];
    tasks.splice(draggedIndex, 1);
    tasks.splice(targetIndex, 0, draggedTask);
    saveTasks();
    renderTasks();
  }
}

function dragEnd(e) {
  e.target.style.opacity = "1";
  draggedIndex = null;
}
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text !== "") {
    tasks.push({ text, done: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();
