const {pool} = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../keys/secret-key.js').secretKey;
exports.login = async (req,res) => {

    try {
        
        if (!req.body || !req.body.email || !req.body.password) {
            console.error('Invalid body')
          return res.status(400).json({ error: 'Invalid body' });
        }
  
        const result = await pool.query(
            `SELECT * FROM users WHERE email=$1`, 
            [req.body.email]
        );
    
        const user = result?.rows[0];
        if (!user || !(await bcrypt.compare(req.body.password, user.password_hash))) {
            console.error('Invalid credentials');

          return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, secret , { expiresIn: '1h' });
        res.json({ token });
        console.log('logged in');
    } catch(e) {
        console.error('Login server error');
        return res.status(500).json({ error: 'Login server error' });
    }

}
