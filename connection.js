const http = require('http');
import app from './main';

const port = 1000;
const server = http.createServer(app);
server.listen(port, console.log(`server is running on port ${port}`));


