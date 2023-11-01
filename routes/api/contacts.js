const express = require('express');
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody } = require("../../middelwares");
const schemas = require("../../helpers/dataValidator");
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

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateById);
  
// router.put('/:contactId', isValidId, validateBody(schemas.addSchema),
//   ctrl.updateContact);

module.exports = router;