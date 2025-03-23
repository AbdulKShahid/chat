const {pool} = require('../db.js');
exports.list = (req,res) => {

    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
          throw error
        }
        res.json(results.rows);
    })
}


exports.create = (req,res) => {

    pool.query('INSERT INTO users ()', (error, results) => {
        if (error) {
          throw error
        }
        res.json(results.rows);
    })
}
