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
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (username === "" || password === "") {
    alert("Please enter username and password");
    return;
  }

  try {
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
      document.getElementById("registerUsername").value = "";
      document.getElementById("registerPassword").value = "";
      showLogin();
    } else {
      alert("Registration failed. Username may already exist.");
    }
  } catch (error) {
    alert("Registration error. Check backend connection.");
  }
}

async function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (username === "" || password === "") {
    alert("Please enter username and password");
    return;
  }

  try {
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

      document.getElementById("loginUsername").value = "";
      document.getElementById("loginPassword").value = "";

      showDashboard();
    } else {
      alert("Invalid username or password.");
    }
  } catch (error) {
    alert("Login error. Check backend connection.");
  }
}

async function addTask() {
  const task = document.getElementById("taskInput").value.trim();

  if (task === "") {
    alert("Please enter a task.");
    return;
  }

  try {
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
      alert("Task adding failed.");
    }
  } catch (error) {
    alert("Could not add task.");
  }
}

async function getTasks() {
  try {
    const response = await fetch("get_task.php", {
      method: "GET",
      headers: {
        "Authorization": token
      }
    });

    const data = await response.json();

    const taskList = document.getElementById("taskList");
    const taskCount = document.getElementById("taskCount");
    const taskCountText = document.getElementById("taskCountText");

    taskList.innerHTML = "";

    if (data.status === "unauthorized") {
      alert("Please login again.");
      logout();
      return;
    }

    taskCount.innerText = data.length;
    taskCountText.innerText = data.length + (data.length === 1 ? " Task" : " Tasks");

    if (data.length === 0) {
      taskList.innerHTML = `<div class="empty">No tasks available. Add your first task.</div>`;
      return;
    }

    data.forEach(function(task, index) {
      const div = document.createElement("div");
      div.className = "task-item";

      div.innerHTML = `
        <strong>Task ${index + 1}</strong><br>
        ${task.task}
      `;

      taskList.appendChild(div);
    });
  } catch (error) {
    alert("Could not load tasks.");
  }
}

async function logout() {
  try {
    if (token) {
      await fetch("logout.php", {
        method: "POST",
        headers: {
          "Authorization": token
        }
      });
    }
  } catch (error) {
    console.log("Logout error");
  }

  localStorage.removeItem("token");
  token = null;
  showLogin();
}

if (token) {
  showDashboard();
} else {
  showLogin();
}