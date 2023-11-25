const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
const db = require("../config/connection");

//Route to GET template per login status (either private or public page)
router.get("/", ({ session: { isLoggedIn } }, res) => {
  if (isLoggedIn) return res.redirect("/private");
  res.render("index", { isLoggedIn });
});

//Route to GET template for log in page
router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("login", { error: req.query.error });
});

//Route to GET template for sign up page
router.get("/signup", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("signup", { error: req.query.error });
});

//Route to render /private page with all user medicines
router.get("/private", checkAuth, controllers.userMedicine.getAllMedicines);

//Route for "/search" to render "search" template
router.get("/search", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("search");
});

//Route for "/medicine"  to render "/medicine" template with medicine name from query params from URL
router.get("/medicine", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("medicine");
});

//Route for "/medicine/:id" to render "/medicine_id" template with specific medicine from req params from url
router.get("/medicine/:id", checkAuth, controllers.userMedicine.getMedicine);

module.exports = router;
