const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");


router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);


//UPDATE URL AFTER TESTING***
//Route to post new medicine to database from "/medicine" page
router.post("/medicine/add", controllers.userMedicine.addMedicine);

//Route to update current medicine in database from "/medicine page/medicine id" page
router.update("/medicine/update", controllers.userMedicine.updateMedicine);

//Route to delete medicine in database from "/medicine page/medicine id" page
router.delete("/medicine/remove", controllers.userMedicine.removeMedicine);





module.exports = router;
