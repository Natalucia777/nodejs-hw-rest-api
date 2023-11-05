const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middelwares");
const { updateContactSchema } = require("../../schemas/contactsSchema")
// const { HttpError, ctrlWrapper } = require("../../helpers");
// const schemas = require("../../helpers/dataValidator");
const express = require('express');
const router = express.Router();
const path = require("node:path");

const ACTIONS = path.join(__dirname, '../../models/contacts.js');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  } = require(ACTIONS);

router.get('/', listContacts);
router.get('/:id', getContactById);
router.post('/', addContact);
router.delete('/:id', removeContact);
router.put('/:id', validateBody(updateContactSchema), ctrl.updateById);
  
module.exports = router;