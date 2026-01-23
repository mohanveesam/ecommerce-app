const express = require('express');
const router = express.Router();
const category = require('../controllers/category.controller');

router.get('/', category.getCategories);
router.post('/', category.addCategory);
router.patch('/:id', category.updateCategory);
router.delete('/:id', category.deleteCategory);

module.exports = router;
