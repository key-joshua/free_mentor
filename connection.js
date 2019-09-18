const http = require('http');
import app from './main';

const port = 8080;
const server = http.createServer(app);
server.listen(port, console.log(`server is running on port ${port}`));


