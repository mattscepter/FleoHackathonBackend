const express = require('express');
const {
  addCategory,
  updateCategory,
  getCategory,
  getCategoryChildren,
  getCategoryParents,
  deleteOnlyCategory,
  deleteCompleteLink,
} = require('../controller/category');
const router = express.Router();

router.post('/add', addCategory);
router.put('/update/:id', updateCategory);
router.get('/getTopLevel', getCategory);
router.get('/getChildren/:id', getCategoryChildren);
router.get('/getParents/:id', getCategoryParents);
router.delete('/deleteOnlyCategory/:id', deleteOnlyCategory);
router.delete('/deleteCompleteLink/:id', deleteCompleteLink);

module.exports = router;
