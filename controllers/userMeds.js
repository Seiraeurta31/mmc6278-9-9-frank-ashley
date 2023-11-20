const { Medicine } = require("../models");

async function getUserMeds(req, res) {

    const userId = req.session.userId
    const userMeds = await Medicine.userMeds(userId)
    res.render('dashboard', {userMeds, userId})
}


module.exports = { getUserMeds };