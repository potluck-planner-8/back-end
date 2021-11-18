const db = require("../data/db-config");
const { getAllPotlucks } = require("../potlucks/potluck-model");
const { } = require("./invite-router");

async function getAll(){
    return await db("invite");
}

async function getByInviteId(invite_id){
    return await db("invite").where("invite_id", invite_id);
}

async function insert(invite){
    return await db("invite").insert(invite);
}

module.exports = {getAll, getByInviteId};