const express = require("express");
const router = express.Router();

const {
  register,
  login,
  signout,
  forgotPassword,
  confirmAccount,
} = require("../controllers/authController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/signout").get(signout);
router.route("/forgotpassword").post(forgotPassword);

router.get("/confirmed-account/:token", confirmAccount);

module.exports = router;
