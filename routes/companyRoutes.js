const express = require("express");
const router = express.Router();
const { requireToken } = require("../controllers/authController");
const {
  createCompany,
  getAllcompany,
  getCompanybyID,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

router
  .route("/")
  .post(requireToken, createCompany)
  .get(requireToken, getAllcompany);
router
  .route("/:id")
  .get(getCompanybyID)
  .patch(updateCompany)
  .delete(deleteCompany);

module.exports = router;
