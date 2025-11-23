const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use this CORS configuration for production—replace with your real Netlify URL, no trailing slash!
app.use(cors({
  origin: ["https://stirring-mooncake-f055fc.netlify.app"], // Whitelist Netlify site
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// ...mongoose and schema definition remain unchanged...

// Your API routes here (keep as-is)
app.post('/api/travel', async (req, res) => {
  // ...unchanged...
});

app.get('/api/travel/check', async (req, res) => {
  // ...unchanged...
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
