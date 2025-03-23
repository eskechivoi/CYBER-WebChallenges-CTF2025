const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('./userService');
const { SECRET_KEY } = require('../config');

exports.authenticate = async (email, password) => {
  const users = userService.getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return { success: false, message: 'Credenciales inválidas' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false, message: 'Credenciales inválidas' };
  }

  const token = jwt.sign(
    { 
      id: user.id,
      role: user.role,
      email: user.email,
      fname: user.fname,
      lname: user.lname
    },
    SECRET_KEY,
    { algorithm: 'HS256', expiresIn: '1h' }
  );
  return { success: true, token };
};
