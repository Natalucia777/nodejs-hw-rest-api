const express = require('express');
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody } = require("../../middelwares");
const { updateContactSchema } = require("../../schemas/contactsSchema")
// const { HttpError, ctrlWrapper } = require("../../helpers");
// const schemas = require("../../helpers/dataValidator");
const path = require("node:path");

const ACTIONS = path.join(__dirname, '../../models/contacts.js');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  // updateContact,
  } = require(ACTIONS);


router.get('/', listContacts);
router.get('/:id', getContactById);
router.post('/', addContact);

router.delete('/:id', removeContact);

// router.put('/:contactId', updateContact);

router.put('/:id', validateBody(updateContactSchema), ctrl.updateById);
  
// router.put('/:contactId', isValidId, validateBody(schemas.addSchema),
//   ctrl.updateContact);

module.exports = router;