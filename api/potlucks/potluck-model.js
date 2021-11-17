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
    .select(
      "p.potluck_id",
      "p.time",
      "p.date",
      "p.location",
      "p.potluck_id",
      "u.username",
      "u.user_id"
    );
}

const updateById = async (potluck_id, potluck) => {
  await db("potlucks").update(potluck).where("potluck_id", potluck_id);
  return findById(potluck_id);
};

module.exports = {
  insertPotluck,
  getAllPotlucks,
  findById,
  updateById,
};
