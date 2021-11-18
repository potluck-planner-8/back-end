# Potluck Backend

## Basics

use GET, POST, PUT and DELETE to attain what you want from the database
located at https://potluck-planner-8.herokuapp.com/api/

## endpoints

- `https://potluck-planner-8.herokuapp.com/api/auth/register`
  register with `POST`. this requires a password and username
- `https://potluck-planner-8.herokuapp.com/api/auth/login`
  login with `POST`. this requires a password and username

- `https://potluck-planner-8.herokuapp.com/api/users`
  use `GET` for a return of all users

- `https://potluck-planner-8.herokuapp.com/api/potlucks`

1.  use `GET` for a return of all potlucks
2.  use `POST` to add a new potluck. Must have proper login token.
    include: date, time, location, items:[]

- `https://potluck-planner-8.herokuapp.com/api/potlucks/:potluck_id`
  1. use `GET` for a return of a valid potluck and items within.
  2. use `PUT` to edit the basic info. editing items, coming soon.
