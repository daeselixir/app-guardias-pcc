const express = require("express");
const router = express.Router();

const {
  register,
  login,
  signout,
  forgotPassword,
  confirmAccount,
  newPassword,
} = require("../controllers/authController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/signout").get(signout);
router.route("/reset-password").post(forgotPassword);
router.route("/reset-password/:token").post(newPassword);

router.get("/confirmed-account/:token", confirmAccount);

module.exports = router;
