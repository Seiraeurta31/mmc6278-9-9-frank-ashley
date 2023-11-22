const db = require("../config/connection");

async function queryAllUserMeds(userId) {
  const [allUserMeds] = await db.query(
    `SELECT * FROM medicine WHERE user_id=?`,
    userId
  );
  console.log (allUserMeds)
  return allUserMeds;
}

//post: add a new medcine to medicine table WHERE user_id=?

//put: update user medicine to medicine table WHERE medicine_name=?

//delete: remove user meds from medicine table WHERE medicine_id=?
async function queryRemoveMeds(medId) {
  const status = 0
  const [{affectedRows}] = await db.query(
    `DELETE FROM medicine WHERE id = ?`,
    req.params.id
  )
  if (affectedRows === 0) return status
  
  status = 1
  return status
}

module.exports = { queryAllUserMeds };