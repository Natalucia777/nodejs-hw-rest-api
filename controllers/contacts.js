const { Contact } = require("../models/contact");

const { ctrlWrapper, HttpError } = require("../helpers");

const listContacts = async (req, res) => {
  // const result = await Contact.find();
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");

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


const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw new HttpError(404, 'Not found!');
  }
  res.json({ message: "Contact deleted!" });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw new HttpError(404, 'Not found!');
  }
  res.json(result);
};

const addNawContact = async (req, res) => {
  // const result = await Contact.create(req.body);
  const { _id: owner } = req.user;
  const result = await Contact.sreate({ ...req.body, owner });
  res.status(201).json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
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
