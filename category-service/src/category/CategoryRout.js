const { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require('./CategoryController');
const router = require('express').Router();

// Routes
router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:categoryId', getCategory);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);

module.exports = router;
