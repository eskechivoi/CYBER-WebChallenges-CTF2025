const authService = require('../services/authService');

exports.login = (req, res) => {
  const { username, password } = req.body;
  const result = authService.authenticate(username, password);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(401).json({ message: result.message });
  }
};
