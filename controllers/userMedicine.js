const { Medicine } = require("../models");
const axios = require('axios');

//Function to retrieve ALL user medcines from medicine table
async function getAllMedicines(req, res) {

  const userId = req.session.userId
  const username = req.session.userName
  const isLoggedIn = req.session.isLoggedIn

  const userMeds = await Medicine.queryAllMedicine(userId)


  res.render('dashboard', {userMeds, userId, isLoggedIn, username})
  
}

//Function to retrieve a single user medicine from medicine table
async function getMedicine(req, res) {

  const id = req.params.id
  let userMedicine = await Medicine.queryMedicine(id)
  const isLoggedIn = req.session.isLoggedIn

  res.render('medicine', {userMedicine, isLoggedIn})
}

//Function to retrieve formal FDA approved medicine name from /search, or error if not found
async function getMedNameSearch (searchName){
  try{
    const data = await axios.get(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${searchName}"`);

    const {
      results:[{
        openfda: {
          brand_name: [
            medicine_name
          ]
        }
      }]
    } = data.data

    return medicine_name
  }
  catch (err){
    return ("Medicine not found")
  }  
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

    console.log(medicine_name, dosage_mg, frequency)

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

  } catch (err) {
      res.status(500).send('Error adding new medication: ' + err.message)
  } 
}

//Function to update user medicine / redirect to /dashboard. 
//Must replace page with window.location.replace('/dashboard') in public index.js with action & method 
async function updateMedicine(req, res) {

  try {

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
   // TO DO: Redirect user with window.location.replace('/dashboard') in public index.js with action & method 
}

module.exports = { getAllMedicines, getMedicine, getMedNameSearch, updateMedicine, addMedicine, removeMedicine }; 