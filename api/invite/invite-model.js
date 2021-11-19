const db = require("../data/db-config");

async function getAll(potluck_id) {
  return await db("invite").where({ potluck_id });
}

async function getByInviteId(invite_id) {
  return await db("invite").where({ invite_id }).first();
}

async function deleteInvite(invite_id) {
  return await db("invite").where("invite_id", invite_id).del();
}

async function updateInvite(invite) {
  const { invite_id, ...inviteObject } = invite;
  return await db("invite").update(inviteObject).where("invite_id", invite_id);
}

async function insertInvite(invite) {
  const [newInvite] = await db("invite").insert(invite, [
    "user_id",
    "invite_id",
    "potluck_id",
  ]);
  return newInvite;
}

module.exports = {
  getAll,
  getByInviteId,
  deleteInvite,
  updateInvite,
  insertInvite,
};
