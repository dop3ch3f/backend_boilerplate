
module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'ecommerce',
      user: 'dop3ch3f',
      password: 'root',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
