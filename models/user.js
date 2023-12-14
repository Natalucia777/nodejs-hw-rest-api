const { Schema, model } = require("mongoose");
const { mongooseError } = require("../helpers");
const Joi = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

userSchema.post("save", mongooseError);

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "Email field is required",
      "string.base": "Email field must be a string",
    }),
  password: Joi.string().required().messages({
    "any.required": "Password field is required",
    "string.base": "Password field must be a string",
  }),
  subscription: Joi.string().messages({
    "string.base": "Subscription field must be a string",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "Email field is required",
      "string.base": "Email field must be a string",
    }),
  password: Joi.string().required().messages({
    "any.required": "Password field is required",
    "string.base": "Password field must be a string",
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);
module.exports = {
  User,
  schemas,
};
