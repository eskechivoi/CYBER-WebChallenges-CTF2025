const userService = require('../services/userService');

exports.getAllUsers = (req, res) => {
  const users = userService.getUsers();
  res.status(200).json(users);
};
