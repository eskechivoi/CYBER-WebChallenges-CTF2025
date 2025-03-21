const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const usersPath = path.join(__dirname, '../data/users.json');

exports.getUsers = () => {
  const rawData = fs.readFileSync(usersPath);
  return JSON.parse(rawData);
};

exports.saveUser = (user) => {
  const users = this.getUsers();
  users.push(user);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

exports.registerUser = async (username, password, role) => {
  const users = this.getUsers();

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: (users.length + 1).toString(),
    username,
    password: hashedPassword,
    role
  };

  this.saveUser(newUser);
  return newUser;
};
