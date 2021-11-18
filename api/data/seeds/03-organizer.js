
exports.seed = function(knex) {  
  return knex('organizer')
    .truncate()
    .insert([
      {user_id: 1},
      {user_id: 2},
      {user_id: 3},
    ]);
};
