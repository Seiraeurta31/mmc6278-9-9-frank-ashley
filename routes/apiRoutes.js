const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");


router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);


//Route to get all user medicine and render /private page
router.get("/private", checkAuth, controllers.userMedicine.getAllMedicines);

//Route to post new medicine to database from "/medicine" page
router.post("/medicine", controllers.userMedicine.addMedicine);

//Route get medicine search_results and render "search_results" template
router.get("/search_results", checkAuth, controllers.userMedicine.getSearchResults);


//Route for "/medicine/:id" to render "/medicine_id" template with specific medicine from req params from url
router.get("/medicine/:id", checkAuth, controllers.userMedicine.getMedicine);

//Route to update current medicine in database from "/medicine page/medicine id" page
router.update("/medicine/:id", controllers.userMedicine.updateMedicine);

//Route to delete medicine in database from "/medicine page/medicine id" page
router.delete("/medicine/:id", controllers.userMedicine.removeMedicine);

module.exports = router;
