const { Medicine } = require("../models");

async function getAllUserMeds(req, res) {

    const userId = req.session.userId
    const userMeds = await Medicine.queryAllUserMeds(userId)
    // console.log(userMeds.medicine_name)
    res.render('dashboard', {userMeds, userId})
}

//post: add a new medcine

//put: update user medicine  redirect to /private

//delete: remove user meds


module.exports = { getAllUserMeds };