const authService = require('../services/authService');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authService.authenticate(email, password);
    console.log(result);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(401).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
