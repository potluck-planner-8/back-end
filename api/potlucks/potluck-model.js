const db = require("../data/db-config");

async function insertPotluck(potluck) {
  const [newPotluck] = await db("potlucks")
    .insert(potluck, ["potluck_id", "time", "date", "location", "user_id"])
    .select("potluck_id", "time", "date", "location", "user_id");
  return newPotluck;
}

function getAllPotlucks() {
  return db("potlucks");
}

function findById(potluck_id) {
  return db("potlucks as p")
    .join("users as u", "u.user_id", "p.user_id")
    .where({ potluck_id })
    .first()
    .select("p.potluck_id", "p.location", "u.username");
}

module.exports = {
  insertPotluck,
  getAllPotlucks,
  findById,
};
