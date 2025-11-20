// Optional Node.js API sample
// Requires: npm i express mysql2 cors dotenv
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'reservadecitasvk',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/api/servicios', async (req, res) => {
  try{
    const [rows] = await pool.query('SELECT id, nombre, precio, descripcion FROM servicios');
    res.json(rows);
  }catch(err){ console.error(err); res.status(500).json({error:'db'}) }
});

app.get('/api/barberos', async (req, res) => {
  try{
    const [rows] = await pool.query('SELECT id, nombres, apellidos FROM barberos');
    res.json(rows);
  }catch(err){ console.error(err); res.status(500).json({error:'db'}) }
});

app.post('/api/eventos', async (req, res) => {
  try{
    const { nombre, telefono, servicio_id, barbero_id, sede_id, fecha, hora } = req.body;

    const start = fecha + ' ' + hora + ':00';
    const end = new Date(new Date(start).getTime() + 30*60000)
                  .toISOString().slice(0,19).replace('T',' ');

    const [result] = await pool.query(
      'INSERT INTO eventos (title, start, end, color, user_id, barbero_id, servicio_id, sede_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, start, end, '#000000', 1, barbero_id || null, servicio_id || null, sede_id || null]
    );

    res.json({ok:true, id: result.insertId});
  } catch(err) {
    console.error(err);
    res.status(500).json({error:'db'});
  }
});


app.get('/api/sedes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, direccion FROM sedes');
    res.json(rows);
  } catch(err) {
    console.error(err);
    res.status(500).json({error:'db'});
  }
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('API listening on', port));


