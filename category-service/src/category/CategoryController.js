const Category = require('./Category');


const createCategory = async (req, res) => {
    try {
      const { name } = req.body;
      const categoryExist = await Category.findOne({ name });
      if (categoryExist) {
        return res.status(400).json({ message: 'Category already exists' });
      }
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const getCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
    
  const updateCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;
      const category = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const deleteCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const category = await Category.findByIdAndDelete(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find({});
      res.status(200).json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  
  module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    getAllCategories
  };
  