const express = require("express");

const controller = require("../../controller/search.controller");
const router = express.Router();

router.route("/caseData").get(controller.searchClinincalData);
router.route("/saveData").post(controller.insertData);

module.exports = router;