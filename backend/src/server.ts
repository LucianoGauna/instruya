import express from 'express';
import cors from 'cors';
import { pool } from './db';
import authRoutes from './auth/auth.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// nueva ruta para probar MySQL
app.get('/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ ok: true, result: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'DB Connection Error' });
  }
});


app.listen(PORT, () => {
  console.log(`API Instruya escuchando en http://localhost:${PORT}`);
});
