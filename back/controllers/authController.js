const authService = require('../services/authService');

exports.login = (req, res) => {
  const { email, password } = req.body;
  const result = authService.authenticate(email, password);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(401).json({ message: result.message });
  }
};
