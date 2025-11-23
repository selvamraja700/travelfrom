const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS: allow ONLY your Netlify app (no trailing slash)
app.use(cors({
  origin: "https://stirring-mooncake-f055fc.netlify.app",
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Mongoose schema
const travelSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  tripType: String,
  destination: String,
  travellers: Number,
  budget: Number,
  groupLeader: String,
  preferences: String,
  children: Number,
  specialNeeds: String,
  anniversary: Date,
  romanticPreferences: String,
}, { timestamps: true });

const Travel = mongoose.model('Travel', travelSchema);

// POST: Add new trip if not already registered
app.post('/api/travel', async (req, res) => {
  const { email } = req.body;
  try {
    const existing = await Travel.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'You have already submitted your travel details.' });
    }
    const newTravel = new Travel(req.body);
    await newTravel.save();
    res.json({ message: 'Trip details stored successfully!' });
  } catch (error) {
    console.error('Error saving travel data:', error);
    res.status(500).json({ message: 'Server error saving trip details.' });
  }
});

// GET: Check email for already registered user
app.get('/api/travel/check', async (req, res) => {
  const email = req.query.email?.toLowerCase();
  if (!email) return res.status(400).json({ message: 'Email is required' });
  try {
    const existing = await Travel.findOne({ email });
    if (existing) return res.sendStatus(200);
    res.sendStatus(404);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
