const { Medicine } = require("../models");

async function getAllUserMeds(req, res) {

    
    const userId = req.session.userId
    const userMeds = await Medicine.queryAllUserMeds(userId)
    const isLoggedIn = req.session.isLoggedIn
    // console.log(userMeds.medicine_name)
    res.render('dashboard', {userMeds, userId, isLoggedIn})
}

//post: add a new medcine

//put: update user medicine  redirect to /private

//delete: remove user meds


module.exports = { getAllUserMeds };