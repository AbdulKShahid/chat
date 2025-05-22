const {pool} = require('../db.js');
exports.list = (req,res) => {

  try {
    const query = `SELECT 
  messages.id,
  messages.message,
  messages.sent_at,
  messages.sender_id,
  users.name AS user_name
FROM messages
JOIN users ON messages.sender_id = users.id
ORDER BY messages.sent_at ASC;
`
    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      console.log('results rows',results.rows);
      const formattedMessages = results.rows.map(msg => ({
        id: msg.id,
        senderId: msg.sender_id, // sender_id → senderId
        message: msg.message,
        sentAt: msg.sent_at,
        senderName: msg.user_name,
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

exports.sendMessage = async(data) => {
  console.log('Message received:', data);

  try {
      const newMessageResult = await pool.query(
          `INSERT INTO messages (sender_id, message, sent_at) 
           VALUES ($1, $2, NOW()) RETURNING *`, 
          [data.senderId, data.message]
      );
      console.log('newMessageResult',newMessageResult);

      const msg = newMessageResult.rows[0];
      const userResult = await pool.query(
        `SELECT * FROM users WHERE id=$1`,[data.senderId]
      );
      console.log('userResult',userResult);
      const formattedMessages = {
        id: msg.id,
        senderId: msg.sender_id, // sender_id → senderId
        message: msg.message,
        sentAt: msg.sent_at,
        senderName: userResult.rows[0].name,
    };
    return formattedMessages;

  } catch (error) {
      console.error('Database error:', error);
  }

}
