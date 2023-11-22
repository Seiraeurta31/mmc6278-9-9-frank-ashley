const { Medicine } = require("../models");

async function getAllUserMeds(req, res) {

    
    const userId = req.session.userId
    const userMeds = await Medicine.queryAllUserMeds(userId)
    const isLoggedIn = req.session.isLoggedIn
    // console.log(userMeds.medicine_name)
    res.render('dashboard', {userMeds, userId, isLoggedIn})
}

//post: add a new medcine
async function storeNewMed(req, res) {
    try {
        const {
            medicine_name,
            dosage_mg,
            frequency
        } = req.body
        if (!(
            medicine_name &&
            dosage_mg &&
            frequency 
        ))
          return res
            .status(400)
            .send('must include medicine name, dosage, and frequency')
    
        await db.query(`
          INSERT INTO medicine (medicine_name, dose_mg, frequency, user_id)
          VALUES (?, ?, ?)
        `, [medicine_name, dosage_mg, frequency])
        res.redirect("/private")
    } catch (err) {
        res.status(500).send('Error adding new medication: ' + err.message)
    } 
}
//put: update user medicine  redirect to /private





// Delete Medicine: Remove displayed med per /MedInfo/:id route
// Must replace page with window.location.replace('/private') in public index.js with action & method 
async function removeMeds(req, res) {
     
    const medId = req.params.id
    const status = await Medicine.queryRemoveMeds(medId)
    if (status === 1)
      res.status(204).end()
    else
      res.status(404).send('Unable to delete Medicine')
}


module.exports = { getAllUserMeds }; 