const express = require('express');
const router = express.Router();
const { Report } = require('../models/Report');

// GET /api/reports - Get all reports
router.get('/', (req, res) => {
  try {
    const reports = Report.getAll();
    res.json({ success: true, data: reports, count: reports.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/reports/:id - Get single report
router.get('/:id', (req, res) => {
  try {
    const report = Report.getById(req.params.id);
    if (!report) return res.status(404).json({ success: false, error: 'Report not found' });
    res.json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/reports - Create new report
router.post('/', (req, res) => {
  try {
    const { title, description, category, location, reporter_name, reporter_email } = req.body;
    if (!title || !description || !category || !location) {
      return res.status(400).json({ success: false, error: 'title, description, category, and location are required' });
    }
    const report = Report.create({ title, description, category, location, reporter_name, reporter_email });
    res.status(201).json({ success: true, data: report, message: 'Report submitted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/reports/:id/status - Update report status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ success: false, error: 'status is required' });
    const report = Report.updateStatus(req.params.id, status);
    if (!report) return res.status(404).json({ success: false, error: 'Report not found' });
    res.json({ success: true, data: report, message: 'Status updated successfully' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
