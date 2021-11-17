exports.seed = function (knex) {
  return knex("users").insert([
    {
      username: "user0",
      password: "$2a$06$HVkcL1p.MxTAYjAR11vZme5pTlZZzbmdkRloHNYC7UNg/TCHYrQ42",
    },
    {
      username: "user1",
      password: "$2a$06$HVkcL1p.MxTAYjAR11vZme5pTlZZzbmdkRloHNYC7UNg/TCHYrQ42",
    },
    {
      username: "user2",
      password: "$2a$06$HVkcL1p.MxTAYjAR11vZme5pTlZZzbmdkRloHNYC7UNg/TCHYrQ42",
    },
    {
      username: "user3",
      password: "$2a$06$HVkcL1p.MxTAYjAR11vZme5pTlZZzbmdkRloHNYC7UNg/TCHYrQ42",
    },
  ]);
};
