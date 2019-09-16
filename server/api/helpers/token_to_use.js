// import jwt from 'jsonwebtoken';
// const verfy_token = ()=> {
//   try
//   {
//     const receive_token_from_header = request.headers.authorization;
//     const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
//     if (decoded_token_in_the_way_to_obtain_user_details != 0) 
//     {
//       next();
//     }
    
//   }

//   catch (error) {
//     return response.status(401).json({
//       status : 401,
//       message : ` Hy !! Access denied, Check your credentials`
//     })
//   }
// }

//   export default verfy_token;


// const verify_token = (receive_token_from_header) =>{
//   const token = here_you_will_parsing_token_from_header_which_provided_by_user;
//   const decoded_token_in_the_way_to_obtain_user_details = jwt.verify(receive_token_from_header, process.env.SECRET_KEY);
// //   return decoded_token_in_the_way_to_obtain_user_details;
// }

// export default { verify_token }