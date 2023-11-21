const { Medicine } = require("../models");

async function getAllUserMeds(req, res) {

    const userId = req.session.userId
    const userMeds = await Medicine.queryAllUserMeds(userId)
    console.log(userMeds)
    res.render('dashboard', {userMeds, userId})
}

//add to user meds

//update user meds

//delete user meds


module.exports = { getAllUserMeds };