const http = require('http');
const app = require('./main');

const port=3000;
const server = http.createServer(app);
server.listen(port, console.log(`App is running on port ${port}`));


// module.exports = server;