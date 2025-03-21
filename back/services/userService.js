const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');

exports.getUsers = () => {
  const rawData = fs.readFileSync(usersPath);
  return JSON.parse(rawData);
};
