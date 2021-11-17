const db = require("../data/db-config");

async function insertItem(item) {
  const [newItem] = await db("items")
    .insert(item, ["potluck_id", "item_id", "item_name"])
    .select("potluck_id", "item_id", "item_name");
  return newItem;
}

module.exports = { insertItem };
