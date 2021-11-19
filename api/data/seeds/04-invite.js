exports.seed = function (knex) {
  return knex("invite")
    .truncate()
    .insert([
      {
        user_id: 3,
        potluck_id: 1,
        description: "emtpy description",
        accepted: false,
      },
    ]);
};
