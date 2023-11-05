const contacts = require("../models/contacts");
const { ctrlWrapper, HttpError } = require("../helpers");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw new HttpError(404, "Not found!");
  }
  res.json(result);
};

module.exports = {
  updateById: ctrlWrapper(updateById),
};