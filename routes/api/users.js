const express = require("express");
const { validateBody } = require("../../middelwares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/users");

const router = express.Router();

router.post("/register", ctrl.register );
router.post("/login", ctrl.login);
router.post("/logout",  ctrl.logout);
router.get("/current", ctrl.getCurrent);

module.exports = router;