const http = require('http');
const sql = require('mssql');

const config = {
server: process.env.DB_SERVER,
database: process.env.DB_DATABASE,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
options: {
encrypt: true,
trustServerCertificate: false
}
};

async function iniciar() {
 const pool = await sql.connect(config);
 const server = http.createServer(async (req, res) => {
  const peliculas = await pool.request().query('SELECT * FROM peliculas');
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(peliculas.recordset));
 });

 server.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('API escuchando en puerto 3000');
 });
}

iniciar();
