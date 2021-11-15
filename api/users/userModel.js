const db = require("../data/db-config");

function getAllUsers() {
  return db("users").select("user_id", "username");
}

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db("users")
    .insert(user, ["user_id", "username"])
    .select("user_id", "username");
  return newUserObject;
}

function findById(id) {
  return db("users").where({ id }).first().select("user_id", "username");
}

function findBy(filter) {
  return db("users").where(filter);
}

module.exports = {
  getAllUsers,
  insertUser,
  findBy,
  findById,
};
