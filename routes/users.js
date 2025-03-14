const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersFilePath = path.join(__dirname, "../users.json");

// Function to read users from JSON file
const readUsers = () => {
  const users = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(users);
};

// Function to write users to JSON file
const writeUsers = (users) => {};

// Get all users
router.get("/", (req, res) => {
  res.json(readUsers());
});

// Create a new user
router.post("/", (req, res) => {
  const name = req.body.name;
  const users = readUsers();
  const user = { id: users[users.length - 1].id + 1, name };
  users.push(user);
  fs.writeFileSync(usersFilePath, JSON.stringify(users));
  res.sendStatus(200);
});

// Update a user by ID
router.put("/:id", (req, res) => {});

// Delete a user by ID
router.delete("/:id", (req, res) => {});

module.exports = router;
