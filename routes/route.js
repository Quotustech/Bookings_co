const express = require("express");
const router = express.Router();

const userController = require('../controller/userController');


// Create user
router.post("/createuser", userController.createUser);

// Update user
router.put("/updateuser/:id", userController.updateUser);

// Delete user
router.delete("/deleteuser/:id", userController.deleteUser);

// Get all users
router.get("/users", userController.getAllUsers);

// Get a specific user
router.get("/users/:id", userController.getUserById);



router.use((req, res) => {
    res.status(404).json({ error: "URL not found" });
  });
  
  module.exports = router;