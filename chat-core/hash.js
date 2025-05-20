const bcrypt = require('bcrypt');

const password = 'password'; // 🔁 Replace with desired password
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then(hash => {
  console.log('Hashed password:', hash);
});
