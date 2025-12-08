const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/api/user/:deviceId', async (req, res) => {
  try {
    const { deviceId } = req.params;
    const result = await pool.query(
      'SELECT * FROM users WHERE device_id = $1',
      [deviceId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/user', async (req, res) => {
  try {
    const { deviceId, username, avatar, carbonCoins } = req.body;
    
    if (!deviceId || !username) {
      return res.status(400).json({ error: 'deviceId and username are required' });
    }

    const result = await pool.query(
      `INSERT INTO users (device_id, username, avatar, carbon_coins)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (device_id) 
       DO UPDATE SET 
         username = EXCLUDED.username,
         avatar = EXCLUDED.avatar,
         carbon_coins = EXCLUDED.carbon_coins,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [deviceId, username, avatar || 'leaf', carbonCoins || 0]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/user/:deviceId/coins', async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { carbonCoins } = req.body;
    
    if (carbonCoins === undefined) {
      return res.status(400).json({ error: 'carbonCoins is required' });
    }

    const result = await pool.query(
      `UPDATE users 
       SET carbon_coins = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE device_id = $2 
       RETURNING *`,
      [carbonCoins, deviceId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating coins:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT username, avatar, carbon_coins 
       FROM users 
       ORDER BY carbon_coins DESC 
       LIMIT 100`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API server running on port ${port}`);
});
