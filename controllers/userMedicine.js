const { Medicine } = require("../models");

//Function to retrieve ALL user medcines from medicine table
async function getAllMedicines(req, res) {

  const userId = req.session.userId
  const userMeds = await Medicine.queryAllMedicine(userId)
  const isLoggedIn = req.session.isLoggedIn

  res.render('dashboard', {userMeds, userId, isLoggedIn})
}

//Function to retrieve a single user medicine from medicine table
async function getMedicine(req, res) {

  const userId = req.session.userId
  const userMedicine = await Medicine.queryMedicine(id)
  const isLoggedIn = req.session.isLoggedIn

  res.render('dashboard', {userMedicine, userId, isLoggedIn})
}

//Function for EXTERNAL API to validate and return medicine brand name
async function getSearchResults(req, res) {

  const isLoggedIn = req.session.isLoggedIn
  const medName = req.query
  medName = strings.ReplaceAll(medName, " ", "+")  //converts spaces in user input to +
  const apiResponse = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${medName}"`) 
  const data = await apiResponse.json()
  
    //If result is not found, data will contain {"error": {"code": "NOT_FOUND","message": "No matches found!"}}
    
    //If result is found, data will contain {"results": [{"openfda": {"brand_name": ["<medicine name>"]}}]}

  res.render('search_results', {data, isLoggedIn})
}

//Function to add a new user medicine to medicine table
async function addMedicine(req, res) {

  try {
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

    await Medicine.queryAddMedicine(medicine_name, dosage_mg, frequency)
    res.redirect('/private')

  } catch (err) {
      res.status(500).send('Error adding new medication: ' + err.message)
  } 
}

//Function to update user medicine / redirect to /private. 
//Must replace page with window.location.replace('/private') in public index.js with action & method 
async function updateMedicine(req, res) {

  try {
    const medId = req.params.id
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
      // TO DO: Redirect user with window.location.replace('/private') in public index.js with action & method 
    else
      res.status(404).send('Unable to find Medicine')
  
  } catch (err) {
      res.status(500).send('Error updating medication: ' + err.message)
  } 
}

//Function to delete a user medicine: Remove displayed med per /MedInfo/:id route
async function removeMedicine(req, res) {
  
  try{
    const medId = req.params.id
    const success = await Medicine.queryRemoveMedicine(medId)

    if (success)
      res.status(204).end()
    else
      res.status(404).send('Unable to delete Medicine')
  }
  catch (err) {
    res.status(500).send('Error deleting medication: ' + err.message)
  }
   // TO DO: Redirect user with window.location.replace('/private') in public index.js with action & method 
}

module.exports = { getAllMedicines, getMedicine, getSearchResults, updateMedicine, addMedicine, removeMedicine }; 