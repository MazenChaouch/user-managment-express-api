const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersFilePath = path.join(__dirname, "../users.json");

// Function to read users from JSON file
const readUsers = () => {};

// Function to write users to JSON file
const writeUsers = (users) => {};

// Get all users
router.get("/", (req, res) => {});

// Create a new user
router.post("/", (req, res) => {});

// Update a user by ID
router.put("/:id", (req, res) => {});

// Delete a user by ID
router.delete("/:id", (req, res) => {});

module.exports = router;
