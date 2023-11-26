const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
const db = require("../config/connection");


// //TEST ROUTE: 
// router.get("/test", controllers.userMedicine.addMedicine);



//Route to GET template per login status (either dashboard or public page)
router.get("/", ({ session: { isLoggedIn } }, res) => {
  if (isLoggedIn) return res.redirect("/dashboard");
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

//Route for /dashboard which gets all user medicine and render /dashboard template
router.get("/dashboard", controllers.userMedicine.getAllMedicines);

// //Route for /dashboard which gets all user medicine and render /dashboard template
// router.get("/dashboard", checkAuth, controllers.userMedicine.getAllMedicines);


//Route for "/search" to render "search" template
router.get("/search", async (req, res) => {
  if (!req.session.isLoggedIn) return res.redirect("/");
  res.render("search");
});

//Route for "/add" to render "search" add_medicine template & populates medicine name from URL query param
router.get("/add", async (req, res) => {
  if (!req.session.isLoggedIn) return res.redirect("/");
  res.render("add_medicine");
});


//Route for "/medicine/:id" to render "/medicine_id" template with specific medicine from req params from url
router.get("/medicine/:id", checkAuth, controllers.userMedicine.getMedicine);

module.exports = router;
