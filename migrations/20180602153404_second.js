
exports.up = (knex, Promise) => knex.schema.alterTable('orders', (t) => {
  t.enu('payment_method', ['cash', 'card']).notNullable().defaultTo('cashrs');
});

exports.down = (knex, Promise) => knex.schema.table('orders', (t) => {
  t.dropColumn('payment_method');
});
