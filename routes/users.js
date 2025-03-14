const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersFilePath = path.join(__dirname, "../users.json");

// Function to read users from JSON file
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Function to write users to JSON file
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Get all users
router.get("/", (req, res) => {
  res.json(readUsers());
});

// Get a single user by ID
router.get("/:id", (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Create a new user
router.post("/", (req, res) => {
  const users = readUsers();
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

// Update a user by ID
router.put("/:id", (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });
  users[userIndex].name = req.body.name;
  writeUsers(users);
  res.json(users[userIndex]);
});

// Delete a user by ID
router.delete("/:id", (req, res) => {
  let users = readUsers();
  users = users.filter((u) => u.id !== parseInt(req.params.id));
  writeUsers(users);
  res.json({ message: "User deleted" });
});

module.exports = router;
