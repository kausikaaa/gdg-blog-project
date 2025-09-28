const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT token for user
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    }
  );
};

// Compare entered password with hashed password
const matchPassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

module.exports = {
  generateToken,
  matchPassword
};
