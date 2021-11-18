exports.seed = function (knex) {
  return knex("invite").insert([
    {
      user_id: 1,
      potluck_id : 1,
      description : "emtpy description",
      accepted: false
    },
  ]);
};
