const User = require('../models/User');
const path = require('path');

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      console.log('error', error);
      return res.redirect('/auth/register');
    }
    res.redirect('/');
  });
};
