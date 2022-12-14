const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middleWare/requireAuth");
const admin = require("../middleWare/adminPermission");
const employee = require("../middleWare/employeePermission");
const passport = require("passport");

const router = express.Router();

router.post("/sign-up", authController.createUser);

router.post("/sign-in", authController.signIn);

router.post("/add-employee",admin, authController.addEmplyoee);

router.get("/google/login/success", authController.sucessGoogleLogin);

router.get("/facebook/login/success", authController.sucessFacebookLogin);

router.get("/google/login/failed", authController.failGoogleLogin);

router.get(
  "/google/login",
  passport.authenticate("google", ["profile", "email"])
);

router.get(
  "/facebook/login",
  passport.authenticate("facebook", ["public_profile", "email"])
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://dsp-archiwebo21-ss-da-om-en.fr/signup",
    failureRedirect: "/google/login/failed",
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "https://dsp-archiwebo21-ss-da-om-en.fr/signup",
    failureRedirect: "/google/login/failed",
  })
);

router.get("/logout", authController.logout);

router.post("/checkUserExist", authController.checkUserExist);

module.exports = router;
