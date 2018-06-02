// Orders controller

const { knex } = require('../../../db/database');
const apiMessages = require('../../../util/messages');
const genError = require('../../../util/genReport');
const crypto = require('crypto');
const Joi = require('joi');
const { schema } = require('../../../validation/ordersSchema');

// to create orders
const registerOrder = (req, res) => {
  const data = req.body;
  const orderId = crypto.randomBytes(16).toString('hex');
  Joi.validate(data, schema, (err, value) => {
    if (err) {
      const report = genError.processErrors(apiMessages.errors.CREATE_FAILED, 'POST', req.url, { code: 'validation' }, data);
      res.status(400).json(report);
    } else {
      return knex('orders').insert({
        order_id: orderId,
        user_id: value.user_id,
        items: value.items,
        total: value.total,
      }).returning(['order_id', 'user_id', 'items', 'total', 'discount', 'created_at', 'status'])
        .then(response => res.json({ status: true, message: 'Insert order successful', data: response }))
        .catch((error) => {
          const report = genError.processErrors(apiMessages.errors.CREATE_FAILED, 'POST', req.url, error, value);
          res.status(400).json(report);
        });
    }
  });
};
// to retrieve orders
const retreiveOrders = (req, res) => {
  const data = req.query;
  // send response using order_id
  if (data.order_id) {
    Joi.validate(data, schema, (err, value) => {
      if (err) {
        const report = genError.processErrors(apiMessages.errors.READ_FAILED, 'GET', req.url, { code: 'validation' }, data);
        res.status(400).json(report);
      } else {
        return knex.select('order_id', 'user_id', 'items', 'total', 'discount', 'created_at', 'status').from('orders').where('order_id', '=', value.order_id)
          .then(response => res.json({ status: true, message: 'order for order id', data: response }))
          .catch((error) => {
            const report = genError.processErrors(apiMessages.errors.READ_FAILED, 'GET', req.url, error, value);
            res.status(400).json(report);
          });
      }
    });
  }
  // send response using user_id
  if (data.user_id) {
    Joi.validate(data, schema, (err, value) => {
      if (err) {
        const report = genError.processErrors(apiMessages.errors.READ_FAILED, 'GET', req.url, { code: 'validation' }, data);
        res.status(400).json(report);
      } else {
        return knex.select('order_id', 'user_id', 'items', 'total', 'discount', 'created_at', 'status').from('orders').where('user_id', '=', value.user_id)
          .then(response => res.json({ status: true, message: 'order for a single user', data: response }))
          .catch((error) => {
            const report = genError.processErrors(apiMessages.errors.READ_FAILED, 'GET', req.url, error, value);
            res.status(400).json(report);
          });
      }
    });
  }
  // send all orders
  return knex.select('order_id', 'user_id', 'items', 'total', 'discount', 'created_at', 'status').from('orders')
    .then(response => res.json({ status: true, message: 'All orders', data: response }))
    .catch((error) => {
      const report = genError.processErrors(apiMessages.errors.READ_FAILED, 'GET', req.url, error, data);
      res.status(400).json(report);
    });
};
// to compeletely change an order
const updateOrders = (req, res) => {
  const data = req.body;
  Joi.validate(data, schema, (err, value) => {
    if (err) {
      const report = genError.processErrors(apiMessages.errors.PUT_FAILED, 'PUT', req.url, { code: 'validation' }, data);
      res.status(400).json(report);
    } else {
      return knex('orders').where('order_id', value.order_id).update(value).returning(['order_id', 'user_id', 'items', 'total', 'discount', 'created_at', 'status'])
        .then(response => res.json({ status: true, message: 'order for order id', data: response }))
        .catch((error) => {
          const report = genError.processErrors(apiMessages.errors.PUT_FAILED, 'PUT', req.url, error, data);
          res.status(400).json(report);
        });
    }
  });
};
// to edit a section of an order
const editOrder = (req, res) => {
  const data = req.body;
  Joi.validate(data, schema, (err, value) => {
    if (err) {
      const report = genError.processErrors(apiMessages.errors.PATCH_FAILED, 'PATCH', req.url, { code: 'validation' }, data);
      res.status(400).json(report);
    } else {
      return knex('orders').where('order_id', value.order_id).update(value).returning(['order_id', 'user_id', 'items', 'total', 'discount', 'created_at', 'status'])
        .then(response => res.json({ status: true, message: 'edit order', data: response }))
        .catch((error) => {
          const report = genError.processErrors(apiMessages.errors.PATCH_FAILED, 'PATCH', req.url, error, data);
          res.status(400).json(report);
        });
    }
  });
};
const deleteOrder = (req, res) => {
  const data = req.body;
  Joi.validate(data, schema, (err, value) => {
    if (err) {
      const report = genError.processErrors(apiMessages.errors.DELETE_FAILED, 'DELETE', req.url, { code: 'validation' }, data);
      res.status(400).json(report);
    } else {
      return knex('orders').where('order_id', value.order_id).returning(['order_id', 'user_id', 'items', 'total', 'discount', 'created_at', 'status']).del()
        .then(response => res.json({ status: true, message: 'order for order id', data: response }))
        .catch((error) => {
          const report = genError.processErrors(apiMessages.errors.DELETE_FAILED, 'DELETE', req.url, error, value);
          res.status(400).json(report);
        });
    }
  });
};

module.exports = {
  registerOrder,
  retreiveOrders,
  updateOrders,
  editOrder,
  deleteOrder,
};

