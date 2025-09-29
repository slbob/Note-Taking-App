require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const notesRoutes = require('./routes/notes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', notesRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
