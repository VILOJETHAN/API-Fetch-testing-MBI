// const express = require("express");
// const cors = require("cors");
// let users = require("./data/user");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/",(req,res) => {
//     res.send("Welcome");
// });

// app.get("/users",(req,res) => {
//     res.json(users);
// })



// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));


const express = require("express");
const cors = require("cors");

let users = require("./data/user");

const app = express();
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Welcome");
});

// GET all users
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// GET single user
app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
});

// CREATE user
app.post("/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and Email required" });
    }

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// UPDATE user
app.put("/users/:id", (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));
    const { name, email } = req.body;

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (!name || !email) {
        return res.status(400).json({ message: "Invalid input" });
    }

    user.name = name;
    user.email = email;

    res.status(200).json(user);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
    const index = users.findIndex(u => u.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);
    res.status(200).json({ message: "User deleted successfully" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
