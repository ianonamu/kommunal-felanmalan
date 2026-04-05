const express = require('express');
const cors = require('cors');
const path = require('path');

const reportsRouter = require('./routes/reports');
const categoriesRouter = require('./routes/categories');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/reports', reportsRouter);
app.use('/api/categories', categoriesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Kommunal Felanmälan API running on http://localhost:${PORT}`);
});

module.exports = app;
