exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).notNullable();
      users.string("password", 200).notNullable();
      users.timestamps(false, true);
    })
    .createTable("potlucks", (potlucks) => {
      potlucks.increments("potluck_id");
      potlucks.string("location", 500).notNullable();
      potlucks.string("time", 120).notNullable();
      potlucks.string("date", 120).notNullable();
      potlucks
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("foods", (foods) => {
      foods.increments("food_id");
      foods.string("food_name", 120).notNullable();
      foods.boolean("food_claimed", false);
      foods
        .integer("potluck_id")
        .unsigned()
        .notNullable()
        .references("potluck_id")
        .inTable("potlucks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists("foods")
    .dropTableIfExists("potlucks")
    .dropTableIfExists("users");
};
