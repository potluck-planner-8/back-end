exports.seed = function (knex) {
  return knex("potlucks").insert([
    {
      time: "12:30PM",
      date: "Dec 30th",
      location: "not The Mall",
      user_id: 1,
    },
    {
      time: "early",
      date: "a Friday",
      location: "all of southern Canada",
      user_id: 1,
    },
    {
      time: "9pm",
      date: "the year 3000",
      location: "secret bungalo",
      user_id: 1,
    },
  ]);
};
