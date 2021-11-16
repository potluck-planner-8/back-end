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

function findById(id) {
  return db("potlucks").where({ id }).first().select("potluck_id", "location");
}

module.exports = {
  insertPotluck,
  getAllPotlucks,
  findById,
};
