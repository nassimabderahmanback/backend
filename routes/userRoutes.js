const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users/:id/history-requests", userController.getUserHisteryContest);
router.get("/users", userController.getUsersList);
router.get("/users/:id", userController.getUserById);
router.post("/users/:id", userController.updateUserProfile);
router.delete("/users/:id", userController.deleteUserProfile);
router.post("/users/prizes/status-change-requests", userController.updateUserPrizeStatus);

module.exports = router;