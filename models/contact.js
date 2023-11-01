// const { request } = require("express");
const { Schema, model } = require('mongoose');
const Joi = require("joi");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Contact name"], },
  email: {
    type: String, },
  phone: {
    type: String, },
});
const Contact = model('contact', contactSchema);

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number().positive(),
});

module.exports = {
  Contact,
  updateContactSchema,
};