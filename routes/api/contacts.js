const express = require('express');
const path = require("node:path");


const router = express.Router();
const ACTIONS = path.join(__dirname, '../../models/contacts.js');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require(ACTIONS);

router.get('/', listContacts);
router.get('/:id', getContactById);
router.post('/', addContact);

router.delete('/:id', removeContact);

router.put('/:id', updateContact);

module.exports = router;