exports.seed = function (knex) {
  //return knex('organizer').truncate()
  return knex("invite")
    .truncate()
    .insert([
      {
        user_id: 1,
        potluck_id : 1,
        organizer_id: 1,
        description : "emtpy description",
        accepted: false
      },
    ]);
};
