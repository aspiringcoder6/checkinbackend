const express = require("express");
const groupController = require("../controllers/group");
const router = express.Router();
router.post("/create", groupController.createGroup);
router.get("/getGroups", groupController.getGroups);
router.get("/delete", groupController.deleteGroup);
router.get("/getGroup", groupController.getGroup);
router.post("/editGroup", groupController.editGroup);
module.exports = router;
