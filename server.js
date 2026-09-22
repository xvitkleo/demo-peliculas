const http = require('http');
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./peliculas.db')

const server = http.createServer((req, res) => {
 db.exec(CREATE TABLE IF NOT EXISTS peliculas ( id INTEGER PRIMARY KEY, titulo TEXT ));
 const peliculas = db.prepare('SELECT * FROM peliculas').all();

 res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

 res.end(JSON.stringify(peliculas));
});
server.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('API escuchando en puerto 3000');
});;
