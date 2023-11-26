const auth = require("./auth");
const user = require("./user");
const userMedicine = require("./userMedicine");


//TO DO (Handled in front end index.js): On submit, get external API data to validate user input for medicine name 
// User confirms name found and is redirected to "/add" with "add_medicine" template with specific medicine from req params from url 
// - OR -  an error message is displayed

async function getSearchResults(req, res) {

  const isLoggedIn = req.session.isLoggedIn
  const medName = req.query
  medName = strings.ReplaceAll(medName, " ", "+")  //converts spaces in user input to +
  const apiResponse = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${medName}"`) 
  const data = await apiResponse.json()
  
  //use window.location
    //If result is not found, data will contain {"error": {"code": "NOT_FOUND","message": "No matches found!"}}
    
    //If result is found, data will contain {"results": [{"openfda": {"brand_name": ["<medicine name>"]}}]}

  res.render('add_medicine', {data, isLoggedIn})
}





module.exports = {
  auth,
  user,
  userMedicine
};
