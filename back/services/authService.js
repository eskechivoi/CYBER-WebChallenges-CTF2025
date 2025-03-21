const jwt = require('jsonwebtoken');
const userService = require('./userService');
const SECRET_KEY = 'your_secret_key'; // Debes usar variables de entorno para esta clave

exports.authenticate = (username, password) => {
  const user = userService.getUsers().find(u => u.username === username && u.password === password);
  if (!user) {
    return { success: false, message: 'Credenciales inválidas' };
  }
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  return { success: true, token, role: user.role };
};
