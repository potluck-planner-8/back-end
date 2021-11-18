
exports.up = async function(knex) {
    await knex.schema
    .createTable('organizer', (organizer)=>{
        organizer.increments("organizer_id");
        organizer.integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users");
    })
    .createTable("invite", (invite) => {
      invite.increments("invite_id");
      invite.integer("user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users");
      invite.integer("organizer_id")
      .unsigned()
      .notNullable()
      .references("organizer_id")
      .inTable("organizer");
      invite
      .integer("potluck_id")
      .unsigned()
      .notNullable()
      .references("potluck_id")
      .inTable("potlucks");
      invite.string("description", 200);
      invite.timestamps(false, true);
      invite.boolean("accepted", false);
    })
    
};  

exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists("invite")
    .dropTableIfExists("organizer");
};
