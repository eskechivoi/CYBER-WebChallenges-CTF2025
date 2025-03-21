const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('./userService');
const SECRET_KEY = 'your_secret_key';

exports.authenticate = async (username, password) => {
  const users = userService.getUsers();
  const user = users.find(u => u.username === username);

  if (!user) {
    return { success: false, message: 'Credenciales inválidas' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false, message: 'Credenciales inválidas' };
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  return { success: true, token, role: user.role };
};
