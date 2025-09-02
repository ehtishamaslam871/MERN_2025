const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const validate = require("../middleware/validate-middleware");
 const { signupSchema, loginSchema } = require( "../validator/auth-validator.js");


router.route("/").get(authControllers.home);

router.route("/registration")
  .post(validate(signupSchema), authControllers.registration);

router.route("/login")
  .post(validate(loginSchema), authControllers.login);

module.exports = router;

