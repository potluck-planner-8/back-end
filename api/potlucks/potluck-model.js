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

async function findById(potluck_id) {
  const potluck = await db("potlucks as p")
    .leftJoin("users as u", "u.user_id", "p.user_id")
    .leftJoin("items as i", "p.potluck_id", "i.potluck_id")
    .select("p.*", "u.username", "i.item_id", "i.item_name")
    .where("p.potluck_id", potluck_id);

  const result = {
    items: [],
  };
  for (let item of potluck) {
    if (!result.potluck_id) {
      result.potluck_id = item.potluck_id;
      result.user_id = item.user_id;
      result.username = item.username;
      result.time = item.time;
      result.date = item.date;
      result.location = item.location;
    }
    if (item.item_id) {
      result.items.push({
        item_id: item.item_id,
        item_name: item.item_name,
      });
    }
  }

  return result;
}

const updateById = async (potluck_id, potluck) => {
  await db("potlucks").update(potluck).where("potluck_id", potluck_id);
  return findById(potluck_id);
};

// function deletePotluck(potluck_id) {
//   return db('potlucks').where({ potluck_id }).del();
// }

module.exports = {
  insertPotluck,
  getAllPotlucks,
  findById,
  updateById,
};
