// Selecetor

const btn = document.querySelector(".btn");
const todoList = document.querySelector(".todo_list");
const todoInput = document.querySelector("#todo");

const filterOption = document.querySelector("#filter_todo");
// Event Handlers
btn.addEventListener("click", createTodo, false);

todoList.addEventListener("click", deleteTodo, false);

filterOption.addEventListener("click", filterTodo, false);
// Functions

function createTodo(e) {
  // prevent default form behavoir
  e.preventDefault();

  if (todoInput.value !== "") {
    // create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create LI
    const newTodo = document.createElement("li");

    newTodo.textContent = todoInput.value;

    newTodo.classList.add("item_list");

    todoDiv.appendChild(newTodo);

    // Save todo to local storage
    save_to_localStorage(todoInput.value);

    // Check mark btn
    const checkBtn = document.createElement("button");

    checkBtn.classList.add("check-btn");
    checkBtn.innerHTML = "<i class='fas fa-check'></i>";

    todoDiv.appendChild(checkBtn);

    // Complete btn
    const trashBtn = document.createElement("button");

    trashBtn.classList.add("delete-btn");

    trashBtn.innerHTML = "<i class='fas fa-trash'></i>";

    todoDiv.appendChild(trashBtn);

    // Append to List
    todoList.appendChild(todoDiv);

    todoState("added");
    count_task();

    todoInput.value = "";
  } else {
    warning("The input must be filled !");
  }
}

function deleteTodo(e) {
  const item = e.target;

  //   console.log(item);

  // Delete todo
  if (item.classList[0] === "delete-btn") {
    const parentElem = item.parentElement;
    parentElem.remove();
    todoState("removed");
    count_task();
  }

  // Check mark

  if (item.classList[0] == "check-btn") {
    const parentElem = item.parentElement;

    parentElem.classList.toggle("checked");
  }
}

// filter Todo
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Save to Locale to Storage
function save_to_localStorage(todo) {
  // craete todo array
  let todos;

  // todos exsist
  if (localStorage.getItem(todos) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

const form = document.querySelector("#todoForm");
function warning(msg) {
  let div = document.createElement("div");
  div.classList.add("warning");
  div.textContent = msg;
  form.insertBefore(div, todoInput);

  setTimeout(function () {
    div.remove();
  }, 1500);
}

function todoState(str) {
  let div = document.createElement("div");

  if (str == "added") {
    div.classList.add("added");

    div.textContent = "Task Added !";
    form.insertBefore(div, todoInput);
    setTimeout(function () {
      div.remove();
    }, 1500);
  } else {
    div.classList.add("deleted");

    div.textContent = "Task Removed !";
    form.insertBefore(div, todoInput);
    setTimeout(function () {
      div.remove();
    }, 1500);
  }
}

function count_task() {
  const task_num = document.querySelector(".task_count");

  task_num.textContent = todoList.childElementCount;
}

count_task();
