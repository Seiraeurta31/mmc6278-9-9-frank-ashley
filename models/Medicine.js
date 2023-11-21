const db = require("../config/connection");

async function queryAllUserMeds(userId) {
  const [[allUserMeds]] = await db.query(
    `SELECT * FROM medicine WHERE user_id=?`,
    userId
  );
  return allUserMeds;
}

//add to user meds table

//update user meds to table

//delete user meds from table


module.exports = { queryAllUserMeds };