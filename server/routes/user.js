const { Router } = require("express");
const { login, register } = require("../controllers/user.controller");
const { registerRequest } = require("../middleware/validator");
const router = Router();

router.post("/login", login).post("/register", registerRequest(), register);

module.exports = router;
