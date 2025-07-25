// File: backend/server.js
// Final debugging attempt: Using the 'cors' library with its most permissive settings
// to definitively rule out a CORS issue as the root cause.

const express = require('express');
const cors = require('cors'); // Re-introducing the cors library for this final test
require('dotenv').config();

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5001;

// --- Permissive CORS Configuration for Debugging ---
// This configuration allows requests from ANY origin and explicitly allows
// the 'Authorization' header. This is the most direct way to bypass
// any potential cross-origin restrictions for testing purposes.
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// --- End of CORS Configuration ---


app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
