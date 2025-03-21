const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('./userService');

/* Aquí está la vulnerabilidad.
La SECRET_KEY con la que estamos encriptando el JWT no es lo suficientemente segura.
(Además está hardcodeada en el código por motivos didácticos, debería de estar en 
un fichero .env, por ejemplo.)
*/
const SECRET_KEY = 'flik.me.3';

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
