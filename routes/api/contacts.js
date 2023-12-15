const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const {
  isValidId,
  validateBody,
  validateFavorite,
  authenticate,
} = require("../../middelwares");
const { schemas } = require("../../models/contact");

router.get('/', authenticate, ctrl.listContacts);
router.get('/:id', authenticate, isValidId, ctrl.getContactById);
router.delete('/:id', authenticate, isValidId, ctrl.removeContact);
router.post('/', authenticate, validateBody(schemas.addContactSchema), ctrl.addNawContact);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.addContactSchema),
  ctrl.updateById
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
