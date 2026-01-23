
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes')
const app = express();

// Allow Angular frontend on 4206
app.use(cors({
  origin: 'http://localhost:4206'
}));

// Parse JSON body
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes)

// Test route
app.get('/', (req, res) => {
  res.send('Server running');
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
