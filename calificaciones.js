const http = require('http');
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./calificaciones.db');
const server = http.createServer((req, res) => {
  const calificaciones  = db.prepare('SELECT * FROM calificaciones').all();
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(calificaciones));
});
server.listen(3001, '0.0.0.0', () => {
  console.log('Servidor de datos escuchando en puerto 3001');
});
