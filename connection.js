const http = require('http');
import app from './main';

<<<<<<< Updated upstream
const port = 8080;
=======
const port = 2000;
>>>>>>> Stashed changes
const server = http.createServer(app);
server.listen(port, console.log(`server is running on port ${port}`));


