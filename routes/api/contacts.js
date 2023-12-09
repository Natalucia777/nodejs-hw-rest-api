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


// router.get('/', ctrl.listContacts);
router.get('/', authenticate, ctrl.listContacts);
// router.get('/:id', isValidId, ctrl.getContactById);
router.get('/:id', authenticate, isValidId, ctrl.getContactById);
// router.delete('/:id', isValidId, ctrl.removeContact);
router.delete('/:id', authenticate, isValidId, ctrl.removeContact);
// router.post('/', validateBody(schemas.addContactSchema), ctrl.addNawContact);
router.post('/', authenticate, validateBody(schemas.addContactSchema), ctrl.addNawContact);

// router.put(
//   '/:id',
//   isValidId,
//   validateBody(schemas.addContactSchema),
//   ctrl.updateById
// );
router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.addContactSchema),
  ctrl.updateById
);

// router.patch(
//   '/:id/favorite',
//   isValidId,
//   validateFavorite(schemas.updateFavoriteSchema),
//   ctrl.updateFavorite
// );
router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
