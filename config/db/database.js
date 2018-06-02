
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'dop3ch3f',
    password: 'root',
    database: 'ecommerce',
  },
});

module.exports = { knex };
