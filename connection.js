const http = require('http');
import app from './main';

const port = 3000;
const server = http.createServer(app);
server.listen(port, console.log(`App is running on port ${port}`));


