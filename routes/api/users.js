const express = require("express");
const { validateBody } = require("../../middelwares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/users");

const router = express.Router();

router.post("/register", ctrl);
router.post("/login", ctrl);
router.post("/logout", ctrl);
router.get("/current", ctrl);

module.exports = router;