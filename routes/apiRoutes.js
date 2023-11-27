const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");


router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);


//Route to post a new medicine to database from "/medicine" page
router.post("/add", controllers.userMedicine.addMedicine);

//Route to update current medicine in database from "/medicine page/medicine id" page
router.put("/medicine/:id", controllers.userMedicine.updateMedicine);

//Route to delete medicine in database from "/medicine page/medicine id" page
router.delete("/medicine/:id", controllers.userMedicine.removeMedicine);


module.exports = router;
