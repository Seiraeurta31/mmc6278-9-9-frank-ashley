const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");


router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);


router.post("/search", async (req, res) => {
    if (!req.session.isLoggedIn) return res.redirect("/");
    const isLoggedIn = req.session.isLoggedIn
  
    console.log("results triggered")
    const {newMedName} = req.body
    console.log (req.body)
    const response = await controllers.userMedicine.getMedNameSearch(newMedName)
  
    console.log(response)
    
    if(response === "Medicine not found"){
      console.log("error triggered")
      const error = response
      res.render("search", {error, isLoggedIn})
    }
    else if (response == newMedName){
      console.log("medicine valid")
      res.render("add", {response, isLoggedIn})
    }
    else {
      console.log("confirm alternate name triggered")
      const confirmName = response
      res.render("search", {response, isLoggedIn, confirmName})
    }
         
  });
  

//Route to post a new medicine to database from "/medicine" page
router.post("/add", controllers.userMedicine.addMedicine);

//Route to update current medicine in database from "/medicine page/medicine id" page
router.put("/medicine/:id", controllers.userMedicine.updateMedicine);

//Route to delete medicine in database from "/medicine page/medicine id" page
router.delete("/medicine/:id", controllers.userMedicine.removeMedicine);


module.exports = router;
