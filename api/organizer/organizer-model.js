const db = require("../data/db-config");

async function getAll(){
    return await db("organizer");
}

async function getById(organizer_id){
    return await db("organizer").where("organizer_id", organizer_id);
}

async function insert(organizer){
    return await db("organizer").insert(organizer,['user_id', 'organizer_id']);
}

async function update(organizer){
    return null;
}

async function remove (organizer_id){
    return await db("organizer").where("organizer_id", organizer_id).del();
}

module.exports = {getAll, getById, insert, update, remove};