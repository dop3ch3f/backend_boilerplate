const Joi = require('joi');
// Validation Schema for Orders Controller
exports.schema = Joi.object().keys({
  id: Joi.number().integer(),
  order_id: Joi.string().alphanum().min(32).max(32),
  user_id: Joi.string().alphanum().min(32).max(32),
  discount: Joi.boolean(),
  created_at: Joi.string(),
  status: Joi.string(),
  items: Joi.object(),
  total: Joi.number(),
  orderId: Joi.string().alphanum().min(32).max(32),
  userId: Joi.string().alphanum().min(32).max(32),
});
