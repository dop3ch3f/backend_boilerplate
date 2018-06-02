const { knex } = require('../database');

// Create the orders schema
const createOrdersTable = () => knex.schema.createTable('orders', (t) => {
  t.bigIncrements('id').primary().notNullable();
  t.string('order_id').notNullable();
  t.string('user_id').notNullable();
  t.boolean('discount').defaultTo(false).notNullable();
  t.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  t.enu('status', ['created', 'shipping', 'fulfilled', 'cancelled']).defaultTo('created').notNullable();
  t.json('items').notNullable();
  t.float('total').notNullable();
});

const dropOrdersTable = () => knex.schema.dropTableIfExists('orders');

module.exports = {
  createOrdersTable,
  dropOrdersTable,
};

