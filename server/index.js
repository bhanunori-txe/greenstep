const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authMiddleware = require('./middleware/authMiddleware');
const User = require('./models/User');
const Submission = require('./models/entry');


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Mongo connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Registration
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcryptjs.hash(password, 10);
    const user = new User({ email, passwordHash: hashed });
    await user.save();

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcryptjs.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Submit carbon data (auth required)
app.post('/api/submit', authMiddleware, async (req, res) => {
  try {
    const { transport, diet, electricity, carbon } = req.body;

    const submission = new Submission({
      user: req.userId,  // this is correct
      transport,
      diet,
      electricity,
      carbon,
});


    await submission.save();
    res.status(201).json({ message: 'Submission saved' });
  } catch (err) {
    console.error('Error saving submission:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get submissions for logged-in user
app.get('/api/submissions', authMiddleware, async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(5000, () => console.log('🚀 Server running on port 5000'));
