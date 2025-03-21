const userService = require('../services/userService');

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Faltan datos necesarios' });
  }

  try {
    const newUser = await userService.registerUser(username, password, role);
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: { id: newUser.id, username: newUser.username, role: newUser.role }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

