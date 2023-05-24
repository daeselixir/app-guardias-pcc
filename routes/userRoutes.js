const express = require("express");
const router = express.Router();
const {requireToken} = require('../controllers/authController')
const { getAllUsers, getById } = require("../controllers/userController");

router.route("/").get(requireToken,getAllUsers);
router.route("/:id").get(requireToken,getById);

module.exports = router;
