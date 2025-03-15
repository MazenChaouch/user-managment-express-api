const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersFilePath = path.join(__dirname, "../users.json");

// Function to read users from JSON file
const readUsers = () => {
  const users = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(users);
};

// Function to write users to JSON file
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users));
};

// Get all users
router.get("/", (req, res) => {
  res.json(readUsers());
});

// Create a new user
router.post("/", (req, res) => {
  const users = readUsers();
  const user = {
    id: users.length == 0 ? 1 : users[users.length - 1].id + 1,
    name: req.body.name,
  };
  users.push(user);
  writeUsers(users);
  res.sendStatus(200);
});

// Update a user by ID
router.put("/:id", (req, res) => {
  const name = req.body.name;
  const id = req.params.id;
  const user = { id, name };
  let users = readUsers();
  const oldUserIndex = users.findIndex((ele) => ele.id == id);
  users[oldUserIndex] = user;
  writeUsers(users);
  res.sendStatus(200);
});

// Delete a user by ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  let users = readUsers();
  users = users.filter((ele) => ele.id != id);
  writeUsers(users);
  res.sendStatus(200);
});

module.exports = router;
