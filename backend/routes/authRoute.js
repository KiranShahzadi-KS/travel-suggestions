const express = require("express");
const {
  registerUser,
  logIn,
  googleRegisterUser,
} = require("../controllers/authController");
const router = express.Router();

router.post("/google", googleRegisterUser);
router.post("/register", registerUser);
router.post("/login", logIn);

module.exports = router;

//------{
// Google registration route
// const passport = require("passport");
// router.use(passport.initialize()); // Initialize Passport

// router.get(
// "/auth/google",
// passport.authenticate("google", { scope: ["profile", "email"] })
// );

// Callback route after successful Google authentication
// router.get(
// "/auth/google/callback",
// passport.authenticate("google", { failureRedirect: "/" }),
// (req, res) => {
// res.redirect("/dashboard");
// }
// );
//-------}
