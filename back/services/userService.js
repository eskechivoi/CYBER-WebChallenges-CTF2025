const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const usersPath = path.join(__dirname, '../data/users.json');
const sanitizeInput = require("sanitize-html");

const escapeHtml = (text) => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

exports.getUsers = () => {
  const rawData = fs.readFileSync(usersPath);
  return JSON.parse(rawData);
};

const saveUser = (user) => {
  const users = this.getUsers();
  users.push(user);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

exports.registerUser = async (email, password, fname, lname, role) => {
  const users = this.getUsers();

  const sanitized_email = escapeHtml(sanitizeInput(email))
  const sanitized_fname = escapeHtml(sanitizeInput(fname))
  const sanitized_lname = escapeHtml(sanitizeInput(lname))

  const existingUser = users.find(user => user.email === sanitized_email);
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: (users.length + 1).toString(),
    email: sanitized_email,
    fname: sanitized_fname,
    lname: sanitized_lname,
    password: hashedPassword,
    role
  };

  saveUser(newUser);
  return newUser;
};
