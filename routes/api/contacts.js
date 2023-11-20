const ctrl = require('../../controllers/contacts');
const { validateBody } = require('../../middelwares');
const {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require('../../schemas/contactsSchema');

// const { HttpError, ctrlWrapper } = require("../../helpers");
// const schemas = require("../../helpers/dataValidator");
const express = require('express');
const router = express.Router();

// const path = require("node:path");
// const ACTIONS = path.join(__dirname, '../../models/contacts.js');
// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   } = require(ACTIONS);

router.get('/', ctrl.listContacts);
router.get('/:id', ctrl.getContactById);
router.post('/', validateBody(updateContactSchema), ctrl.addNawContact);
router.delete('/:id', ctrl.removeContact);
router.put('/:id', validateBody(updateContactSchema), ctrl.updateById);

module.exports = router;
