const db = require("../data/db-config");

async function insertItem(item) {
  const [newItem] = await db("items")
    .insert(item, ["potluck_id", "item_id", "item_name"])
    .select("potluck_id", "item_id", "item_name");
  return newItem;
}

function findById(item_id) {
  return db("items").where({ item_id }).first();
}

function findBy(filter) {
  return db("items").where(filter);
}

const updateById = async (item_id, item) => {
  await db("items").update(item).where("item_id", item_id);
  return findById(item_id);
};

module.exports = { insertItem, updateById, findBy };
