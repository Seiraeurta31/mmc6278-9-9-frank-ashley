const db = require("../config/connection");

async function userMeds(userId) {
  const [allMeds] = await db.query(
    `SELECT * FROM medications WHERE user_id=?`,
    userId
  );
  return allMeds;
}

module.exports = { userMeds };