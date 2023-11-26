const express = require("express");
const ctrl = require('../../controllers/contacts');
const router = express.Router();
const {
  isValidId,
  validateBody,
  validateFavorite,
} = require('../../middelwares');
const { schemas } = require('../../models/contact');


router.get('/', ctrl.listContacts);
router.get('/:id', isValidId, ctrl.getContactById);
router.delete('/:id', isValidId, ctrl.removeContact);

router.post('/', validateBody(schemas.addContactSchema), ctrl.addNawContact);

router.put(
  '/:id',
  isValidId,
  validateBody(schemas.addContactSchema),
  ctrl.updateById
);

router.patch(
  '/:id/favorite',
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
