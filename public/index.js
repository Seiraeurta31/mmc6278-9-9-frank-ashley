
//Delete medication  from medicine Handlebars

async function deleteMedicine(e) {
    e.preventDefault()
    console.log("deleteMedicine triggered")
    const medId = e.target.dataset.medid
    await fetch(`/api/medicine/${medId}`, {
        method: 'DELETE'  //specifies which CRUD to use under the '/cart' route in api-routes.js
    })
    console.log("medicine deleted")
    window.location.replace('/dashboard')
}

const deleteBtn = document.getElementById ("deleteButton")
  if(deleteBtn){
    deleteBtn.addEventListener("click", deleteMedicine)   
}


//TO DO: Chnage event for search button



//Update Medicine from medicine Handlebars

async function updateMedicine(e) {
  e.preventDefault()
  console.log(e.target)
  console.log(e.currentTarget)
  const medId = document.getElementById("updateButton").dataset.medid
  const medicine_name = e.target.medicine_name.value
  const dosage_mg = e.target.dosage_mg.value
  const frequency = e.target.frequency.value

  console.log({medicine_name, dosage_mg, frequency, medId})

  await fetch (`/api/medicine/${medId}`, {
    method: 'PUT', //specifies which CRUD to use under the '/cart/id' route in api-routes.js
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({medicine_name, dosage_mg, frequency})
  })
  window.location.replace('/dashboard')
}

const updateForm = document.querySelector("form")
updateForm.addEventListener("submit", updateMedicine)


