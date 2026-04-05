const express = require('express');
const router = express.Router();
const { db } = require('../models/Report');

// GET /api/categories
router.get('/', (req, res) => {
  try {
    const categories = db.prepare('SELECT * FROM categories').all();
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
