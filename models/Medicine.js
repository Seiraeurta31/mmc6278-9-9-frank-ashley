const db = require("../config/connection");

async function queryAllUserMeds(userId) {
  const [allUserMeds] = await db.query(
    `SELECT * FROM medications WHERE user_id=?`,
    userId
  );
  return allUserMeds;
}

module.exports = { queryAllUserMeds };