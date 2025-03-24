const {pool} = require('../db.js');
exports.list = (req,res) => {

  try {
    pool.query('SELECT * FROM messages', (error, results) => {
      if (error) {
        throw error
      }
      const formattedMessages = results.rows.map(msg => ({
        id: msg.id,
        senderId: msg.sender_id, // sender_id → senderId
        message: msg.message,
        sentAt: msg.sent_at
    }));
      res.json(formattedMessages);
  })
  } catch(error) {

    console.error('Database error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }

}


exports.create = async (req, res) => {
  const {senderId, message } = req.body; // Extract values from request body

  if (!senderId || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
      const results = await pool.query(
          `INSERT INTO messages (sender_id, message, sent_at) 
           VALUES ($1, $2, NOW()) RETURNING *`, 
          [senderId, message]
      );
      const formattedMessages = results.rows.map(msg => ({
        id: msg.id,
        senderId: msg.sender_id, // sender_id → senderId
        message: msg.message,
        sentAt: msg.sent_at
    }));

      res.status(201).json(formattedMessages[0]); // Send back the inserted message
  } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

