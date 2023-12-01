const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");


router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);

//Route to search for new medicine in external database on "/search" page
router.post("/search", async (req, res) => {
    if (!req.session.isLoggedIn) return res.redirect("/");
    const isLoggedIn = req.session.isLoggedIn

    //take in user input for med name
    let {newMedName} = req.body

    //convert multi word user input to + concatnated string for external API search
    const searchTerm = newMedName.replaceAll(" ", "+")
    const response = await controllers.userMedicine.getMedNameSearch(searchTerm)
  

    // use API response to prompt user or redirect to /addMedicine with query param of valid med name
    if(response === "Medicine not found"){
        const error = true
        res.render("search", {error, isLoggedIn})
    }
    else if (response == newMedName){ //med name verified, redirected to add med page with query param
        res.redirect("/addMedicine?medName=" + response)
    }
    else { //prompt user with alternate entry option
        const confirmName = response
        res.render("search", {response, isLoggedIn, confirmName})
        
    }
         
  });
  
//Route to post a new medicine to database from "/medicine" page
router.post("/addMedicine", controllers.userMedicine.addMedicine);

//Route to update current medicine in database from "/medicine page/medicine id" page
router.put("/medicine/:id", controllers.userMedicine.updateMedicine);

//Route to delete medicine in database from "/medicine page/medicine id" page
router.delete("/medicine/:id", controllers.userMedicine.removeMedicine);

module.exports = router;
