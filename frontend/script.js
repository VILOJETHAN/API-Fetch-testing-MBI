const API_URL = "http://localhost:5000/users";

// Fetch and display all users
async function fetchUsers() {
    try {
        const res = await fetch(API_URL);
        const users = await res.json();

        const list = document.getElementById("userList");
        list.innerHTML = "";

        users.forEach(user => {
            const li = document.createElement("li");
            li.innerHTML = `
        <strong>${user.name}</strong> (${user.email})
        <button onclick="updateUser(${user.id})">Edit</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
      `;
            list.appendChild(li);
        });
    } catch (err) {
        console.error("Error fetching users", err);
    }
}

// Add new user
async function addUser() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
        alert("Name and Email are required");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
    });

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";

    fetchUsers();
}

// Update user
async function updateUser(id) {
    const name = prompt("Enter updated name:");
    const email = prompt("Enter updated email:");

    if (!name || !email) {
        alert("Invalid input");
        return;
    }

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
    });

    fetchUsers();
}

// Delete user
async function deleteUser(id) {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    fetchUsers();
}

// Initial load
fetchUsers();
