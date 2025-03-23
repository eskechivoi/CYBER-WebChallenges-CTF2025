const userService = require('../services/userService');

exports.register = async (req, res) => {
  const { email, password, fname, lname } = req.body;

  if (!email || !password || !fname || !lname) {
    return res.status(400).json({ message: 'Faltan datos necesarios' });
  }

  try {
    const newUser = await userService.registerUser(email, password, fname, lname, "minion");
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: { id: newUser.id, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
