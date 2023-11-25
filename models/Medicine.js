const db = require("../config/connection");

//QUERY to get all userMedicineS
async function queryAllMedicine(userId) {
  const [allUserMeds] = await db.query(
    `SELECT * FROM medicine WHERE user_id=?`,
    userId
  );
  console.log (allUserMeds)
  return allUserMeds;
}

//QUERY to get specific user medicine from medicine table WHERE id=?
async function queryMedicine(id) {
  const [userMed] = await db.query(
    `SELECT * FROM medicine WHERE id=?`,
    id
  );
  console.log (userMed)
  return allUserMeds;
}

//QUERY to add new medcine to medicine table WHERE user_id=?
async function queryAddMedicine(medicine_name, dosage_mg, frequency) {
    await db.query(`
    INSERT INTO medicine (medicine_name, dose_mg, frequency, user_id)
    VALUES (?, ?, ?)
    `, [medicine_name, dosage_mg, frequency, userId])
    console.log (queryAllMedicine(2))   
}

//QUERY to update a medicine in medicine table WHERE medicine_name=?
async function queryUpdateMedicine(medicine_name, dosage_mg, frequency, medId) {
  const success = false
  const [{affectedRows}] = await db.query(`
  UPDATE inventory SET ? WHERE id = ?`, 
  [{medicine_name, dosage_mg, frequency}, medId]
  ) 
  if (affectedRows === 0 ) return success

  success = true
  console.log (queryAllMedicine(2))
  return success
}

//QUERY to remove user medication from medicine table WHERE medicine_id=?
async function queryRemoveMedicine(medId) {
  const success = false
  const [{affectedRows}] = await db.query(
    `DELETE FROM medicine WHERE id = ?`,
    medId
  )
  if (affectedRows === 0) return success
  
  success = true
  console.log (queryAllMedicine(2))
  return success
}

module.exports = { queryAllMedicine, queryMedicine, queryAddMedicine, queryUpdateMedicine, queryRemoveMedicine};