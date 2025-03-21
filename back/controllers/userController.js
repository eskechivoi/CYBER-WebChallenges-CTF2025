const userService = require('../services/userService');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan datos necesarios' });
  }

  try {
    const newUser = await userService.registerUser(username, password, "minion");
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: { id: newUser.id, username: newUser.username, role: newUser.role }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

