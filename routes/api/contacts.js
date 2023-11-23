const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router();
const { isValidId, validateBody, validateFavorite } = require('../../middelwares');

const { schemas } = require("../../models/contact");
// const {
//   addContactSchema,
//   updateContactSchema,
//   updateFavoriteSchema,
// } = require('../../schemas/contactsSchema');

// const { HttpError, ctrlWrapper } = require("../../helpers");
// const schemas = require("../../helpers/dataValidator");


// const path = require("node:path");
// const ACTIONS = path.join(__dirname, '../../models/contacts.js');
// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   } = require(ACTIONS);

router.get('/', ctrl.listContacts);
router.get('/:id', isValidId, ctrl.getContactById);
router.post('/', validateBody(schemas.addContactSchema), ctrl.addNawContact);
router.delete('/:id', isValidId, ctrl.removeContact);
router.put('/:id', isValidId, validateBody(schemas.addContactSchema), ctrl.updateById);
router.patch('/:id/favorite', isValidId, validateFavorite(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;
