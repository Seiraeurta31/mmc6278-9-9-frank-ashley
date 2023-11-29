
//Delete medication  from medicine Handlebars

async function deleteMedicine(e) {
    console.log("deleteMedicine triggered")
    const medId = e.target.getAttribute('medId')
    await axios.get(`/api/medicine/:${medId}`, {
        method: 'DELETE'  //specifies which CRUD to use under the '/cart' route in api-routes.js
    })
    console.log("medicine deleted")
    window.location.replace('/dashboard')
}

const deleteBtn = document.getElementById("deleteButton")
  if(deleteBtn){
    deleteBtn.addEventListener("click", deleteMedicine)   
}


//Update Medicine from medicine Handlebars

async function updateMedicine(e) {

  const medId = e.target.getAttribute('medId')
  const medicine_name = e.medicine_name.value
  const dosage_mg = e.dosage_mg.value
  const frequency = e.frequency.value

  await axios.get(`/api/medicine/:${medId}`, {
    method: 'PUT', //specifies which CRUD to use under the '/cart/id' route in api-routes.js
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({medicine_name, dosage_mg, frequency})
  })
  window.location.r('/dashboard')
}

const updateBtn = document.getElementById("updateButton")
  if(updateBtn){
    updateBtn.addEventListener("click", updateMedicine) 
    console.log("test")  
}


