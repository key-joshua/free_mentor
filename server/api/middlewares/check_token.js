import jwt from 'jsonwebtoken';
const verfy_token = (request, response, next)=> {
  try
  {
    const receive_token_from_header = request.headers.authorization;
    const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
    next();
  
    
  }

  catch (error) {
    return response.status(401).json({
      status : 401,
      message : ` Hy !! Access denied, Check your credentials`
    })
  }
}

  export default verfy_token;