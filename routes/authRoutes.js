const express = require("express");
const router = express.Router();

const { register, login,signout } = require("../controllers/authController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route('/signout').get(signout);

module.exports = router;
