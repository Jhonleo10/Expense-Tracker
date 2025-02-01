
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser, updateProfile, getUserProfile } = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticate')
const router = express.Router();
const User = require('../models/User')

// Register route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  

      const hashedPassword = await bcrypt.hash(password, 10);
  
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
    
      await newUser.save();
  

      const token = jwt.sign({ id: newUser._id }, 'your-jwt-secret', { expiresIn: '1h' });
  

      res.status(201).json({ message: 'Registration successful', token });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Error during registration. Please try again later.' });
    }
  });
  
  
// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
 
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }
  
    try {
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ id: user._id }, 'your-jwt-secret', { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);  
      res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
  });

// Profile update route 
router.get('/profile', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error('Error fetching profile:', err);
      res.status(500).json({ message: 'Error fetching profile' });
    }
  });

// Get Profile
router.get('/profile', authenticateToken, getUserProfile);

// PUT profile update route
router.put("/profile", authenticateToken, async (req, res) => {
    const { name, age, phone, email, salary, salaryAlert } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { name, age, phone, email, salary, salaryAlert },
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      console.error("Error updating profile:", err);
      res.status(500).json({ message: "Error updating profile" });
    }
  });

// Protected route to get dashboard data
router.get("/dashboard", authenticateToken, async (req, res) => {
    try {
       
        const userId = req.user._id;  
 
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            name: user.name,
            email: user.email,
            salary: user.salary,
            totalExpenses: user.totalExpenses,
            remainingBalance: user.salary - user.totalExpenses,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while fetching dashboard data." });
    }
});


module.exports = router;
