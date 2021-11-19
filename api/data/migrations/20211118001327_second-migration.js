exports.up = async function (knex) {
  await knex.schema.createTable("invite", (invite) => {
    invite.increments("invite_id");
    invite.integer("user_id").unsigned().notNullable();
    invite
      .integer("potluck_id")
      .unsigned()
      .notNullable()
      .references("potluck_id")
      .inTable("potlucks");
    invite.string("description", 200);
    invite.timestamps(false, true);
    invite.boolean("accepted").defaultTo(false);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("invite").dropTableIfExists("organizers");
};
