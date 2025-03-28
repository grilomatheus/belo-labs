const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    return res.status(200).json({
      token: 'mocked-jwt-token',
      userID: 'mocked-user-id'
    });
  }

  return res.status(400).json({ message: 'Missing username or password' });
};

exports.register = async (req, res) => {
  return res.status(200).json({ message: 'Registered successfully (mock)' });
};

