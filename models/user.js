const { Schema, model } = require("mongoose");
const { mongooseError } = require("../helpers");
const Joi = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password"],
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
  { versionKey: false, timestamps: true });

userSchema.post("save", mongooseError);

const registerSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min().required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min().required(),
});

const validSubscriptionValues = ["starter", "pro", "business"];
const updateUserSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...validSubscriptionValues).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateUserSubscriptionSchema,
};

const User = model("user", userSchema);

module.export = {
  User,
  schemas,
};
