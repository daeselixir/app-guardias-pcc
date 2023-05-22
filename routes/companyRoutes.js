const express = require("express");
const router = express.Router();

const { createCompany } = require("../controllers/companyController");

router.route("/").post(createCompany);

module.exports = router;
