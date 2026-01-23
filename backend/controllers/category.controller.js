const db = require('../config/mysql');

/* GET ALL CATEGORIES */
exports.getCategories = async (req, res) => {
  try {
    const sql = 'SELECT category_id, category_name FROM categories';

    const [rows] = await db.promise().query(sql);

    return res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
};

/* ADD CATEGORY */
exports.addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    const sql = 'INSERT INTO categories (category_name) VALUES (?)';
    const [result] = await db.promise().query(sql, [category_name]);

    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category_id: result.insertId
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create category',
      error: error.message
    });
  }
};

/* UPDATE CATEGORY */
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    const sql =
      'UPDATE categories SET category_name = ? WHERE category_id = ?';

    const [result] = await db.promise().query(sql, [category_name, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Category updated successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update category',
      error: error.message
    });
  }
};

/* DELETE CATEGORY */
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'DELETE FROM categories WHERE category_id = ?';
    const [result] = await db.promise().query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete category',
      error: error.message
    });
  }
};

