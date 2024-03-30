const express = require("express");
const router = express.Router();
const area = require("../controllers/areaController");

router.route("/getall").post(area.getAreas);
router.route("/remove-days/:id").post(area.removeDaysFromArea);
router.route("/new/:id").post(area.registerArea);
router.route("/update/:id").patch(area.updateArea);
router.route("/delete/:id").delete(area.deleteArea);
router.route("/:id").get(area.getAreaById);

module.exports = router;