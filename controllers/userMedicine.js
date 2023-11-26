const { Medicine } = require("../models");

//Function to retrieve ALL user medcines from medicine table
async function getAllMedicines(req, res) {

  //TESTING VALUES:
  const userId = 2 
  
  //const userId = req.session.userId
  const userMeds = await Medicine.queryAllMedicine(userId)
  const isLoggedIn = true  //req.session.isLoggedIn

  // console.log(userMeds)

  res.render('dashboard', {userMeds, userId, isLoggedIn})
}

//Function to retrieve a single user medicine from medicine table
async function getMedicine(req, res) {

  const id = req.params.id
  let userMedicine = await Medicine.queryMedicine(id)
  const isLoggedIn = req.session.isLoggedIn

  console.log(userMedicine)

  res.render('medicine', {userMedicine, isLoggedIn})
}

//Function to add a new user medicine to medicine table
async function addMedicine(req, res) {

  try {

    //TESTING VALUES:
    // const userId = 2
    // const medicine_name = "applesauce"
    // const dosage_mg = 20
    // const frequency = "4x daily"
    
    const userId = req.session.userId
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

    await Medicine.queryAddMedicine(medicine_name, dosage_mg, frequency, userId)
    res.redirect('/dashboard')

    console.log(getAllMedicines())

  } catch (err) {
      res.status(500).send('Error adding new medication: ' + err.message)
  } 
}

//Function to update user medicine / redirect to /dashboard. 
//Must replace page with window.location.replace('/dashboard') in public index.js with action & method 
async function updateMedicine(req, res) {

  try {

    //TESTING VALUES:
    // const medId = 2
    // const userId = 2
    // const medicine_name = "bagel"
    // const dosage_mg = 20
    // const frequency = "4x daily"

    const medId = req.params.id
    const userId = req.session.userId
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
        .send('Must include medicine name, dosage, and frequency')
   
    const success = await Medicine.queryUpdateMedicine(medicine_name, dosage_mg, frequency, medId)


    if (success)
      res.status(204).end()
      // TO DO: Redirect user with window.location.replace('/dashboard') in public index.js with action & method 
    else
      res.status(404).send('Unable to find Medicine')

  
  } catch (err) {
      res.status(500).send('Error updating medication: ' + err.message)
  } 
}

//Function to delete a user medicine: Remove displayed med per /MedInfo/:id route
async function removeMedicine(req, res) {
  
  try{

    //TESTING VALUES: 
    // const medId = 2

    const medId = req.params.id
    const success = await Medicine.queryRemoveMedicine(medId)

    console.log(success)
    console.log(getAllMedicines())

    if (success)
      res.status(204).end()
    else
      res.status(404).send('Unable to delete Medicine')
  }
  catch (err) {
    res.status(500).send('Error deleting medication: ' + err.message)
  }
   // TO DO: Redirect user with window.location.replace('/dashboard') in public index.js with action & method 
}

module.exports = { getAllMedicines, getMedicine, updateMedicine, addMedicine, removeMedicine }; 