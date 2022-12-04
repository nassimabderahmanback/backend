const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users/:id/history-requests", userController.getUserHisteryContest);
router.get("/users", userController.getUsersList);
router.patch("/users/:id", userController.updateUserProfile);

module.exports = router;