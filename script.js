let token = localStorage.getItem("token");

const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");
const dashboardSection = document.getElementById("dashboardSection");

function showLogin() {
  loginSection.classList.remove("hidden");
  registerSection.classList.add("hidden");
  dashboardSection.classList.add("hidden");
}

function showRegister() {
  registerSection.classList.remove("hidden");
  loginSection.classList.add("hidden");
  dashboardSection.classList.add("hidden");
}

function showDashboard() {
  dashboardSection.classList.remove("hidden");
  loginSection.classList.add("hidden");
  registerSection.classList.add("hidden");
  getTasks();
}

async function register() {
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  if (username === "" || password === "") {
    alert("Please enter username and password");
    return;
  }

  const response = await fetch("register.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  const data = await response.json();

  if (data.status === "success") {
    alert("Registration successful. Please login.");
    showLogin();
  } else {
    alert("Registration failed");
  }
}

async function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (username === "" || password === "") {
    alert("Please enter username and password");
    return;
  }

  const response = await fetch("login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  const data = await response.json();

  if (data.status === "success") {
    token = data.token;
    localStorage.setItem("token", token);
    showDashboard();
  } else {
    alert("Invalid username or password");
  }
}

async function addTask() {
  const task = document.getElementById("taskInput").value;

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  const response = await fetch("add_task.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      task: task
    })
  });

  const data = await response.json();

  if (data.status === "task added") {
    document.getElementById("taskInput").value = "";
    getTasks();
  } else {
    alert("Task adding failed");
  }
}

async function getTasks() {
  const response = await fetch("get_task.php", {
    method: "GET",
    headers: {
      "Authorization": token
    }
  });

  const data = await response.json();
  const taskList = document.getElementById("taskList");

  taskList.innerHTML = "";

  if (data.status === "unauthorized") {
    alert("Please login again");
    logout();
    return;
  }

  if (data.length === 0) {
    taskList.innerHTML = `<div class="empty">No tasks added yet</div>`;
    return;
  }

  data.forEach(function(task) {
    const div = document.createElement("div");
    div.className = "task-item";
    div.innerText = task.task;
    taskList.appendChild(div);
  });
}

async function logout() {
  await fetch("logout.php", {
    method: "POST",
    headers: {
      "Authorization": token
    }
  });

  localStorage.removeItem("token");
  token = null;
  showLogin();
}

if (token) {
  showDashboard();
} else {
  showLogin();
}