const express = require("express");
const router = express.Router();
const area = require("../controllers/areaController");

router.route("/new/:id").post(area.registerArea);
router.route("/update/:id").patch(area.updateArea);
router.route("/delete/:id").delete(area.deleteArea);
router.route("/:id").get(area.getAreaById);

module.exports = router;