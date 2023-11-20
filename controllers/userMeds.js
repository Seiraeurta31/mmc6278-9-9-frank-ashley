const { Medicine } = require("../models");

async function getAllUserMeds(req, res) {

    const userId = req.session.userId
    const userMeds = await Medicine.queryAllUserMeds(userId)
    res.render('dashboard', {userMeds, userId})
}


module.exports = { getAllUserMeds };