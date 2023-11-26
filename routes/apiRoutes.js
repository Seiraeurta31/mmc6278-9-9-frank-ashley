const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");


router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);


//TO DO (Handled in front end index.js): On submit, get external API data to validate user input for medicine name 
// User confirms name found and is redirected to "/add" with "add_medicine" template with specific medicine from req params from url 
// - OR -  an error message is displayed


//Route to post a new medicine to database from "/medicine" page
router.post("/add", controllers.userMedicine.addMedicine);

//Route to update current medicine in database from "/medicine page/medicine id" page
router.put("/medicine/:id", controllers.userMedicine.updateMedicine);

//Route to delete medicine in database from "/medicine page/medicine id" page
router.delete("/medicine/:id", controllers.userMedicine.removeMedicine);


module.exports = router;
