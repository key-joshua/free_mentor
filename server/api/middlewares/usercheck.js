import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const receive_token = (request, response, next)=> {
     const token = jwt.verify(request.headers.authorization,process.env.SECRET_KEY);
    next();
  }
  export default receive_token;