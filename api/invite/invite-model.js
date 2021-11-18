const db = require("../data/db-config");
const { getAllPotlucks } = require("../potlucks/potluck-model");
const { } = require("./invite-router");

async function getAll(){
    return await db("invite");
}

async function getByInviteId(invite_id){
    return await db("invite").where("invite_id", invite_id);
}

async function addInvite(invite){
    // console.log("inside model, addInviteinvite = ", invite);
    return await db("invite").insert(invite, ['invite_id', 'user_id', 'potluck_id','description', 'accepted']);
}

async function deleteInvite(invite_id){
    return await db("invite").where("invite_id", invite_id).del();
}

async function updateInvite(invite){
    const {invite_id, ...inviteObject} = invite;
    return await db("invite").update(inviteObject).where("invite_id", invite_id);
}

module.exports = {getAll, getByInviteId, addInvite, deleteInvite, updateInvite};