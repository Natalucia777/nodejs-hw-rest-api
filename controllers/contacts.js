const { Contact } = require('../models/contact');
const { ctrlWrapper, HttpError } = require('../helpers');

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw new HttpError(404, 'Not found!');
  }
  res.json(result);
};

const addNawContact = async (req, res) => {
  const result = await Contact.sreate(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.removeById(id);
  if (!result) {
    throw new HttpError(404, 'Not found!');
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.updateContact(id, req.body, {
    new: true,
  });
  if (!result) {
    throw new HttpError(404, 'Not found!');
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.updateContact(id, req.body, {
    new: true,
  });
  if (!result) {
    throw new HttpError(404, 'Not found!');
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addNawContact: ctrlWrapper(addNawContact),
  removeContact: ctrlWrapper(removeContact),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
