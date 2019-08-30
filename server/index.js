// import express from 'express';
// import bodyParser from 'body-parser';

const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const users = [

  {
    id: 1,
    category: 'user',
    firstName: 'samuel',
    lastName: 'kayigamba',
    email: 'k.samuel@gmai.com',
    address: 'Kigali/Rwanda',
    bio: 'standup comedy',
    occupation: 'learner',
    expertise: 'mechanical',
    password: 'qwerty',
    confirm_password: 'qwerty',
  },
];

app.get('/', (request, response) => response.status(200).send({ status: 200, message: 'Hey !! Man you are Welcome on Free_Mentors' }));


app.get('/users', (request, response) => response.status(200).send({
  status: 200,
  message: 'Hey !! Hope you are retrieving all users',
  data: users,
}));


app.post('/adduser', (request, response) => {
  const newUser = {
    id: users.length + 1,
    category: 'user',
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    address: request.body.address,
    bio: request.body.bio,
    occupation: request.body.occupation,
    expertise: request.body.expertise,
    password: request.body.password,
    confirm_password: request.body.confirm_password,

  };

  const Name_to_display = newUser.firstName;
  const Email_to_check = newUser.email;

  const insert = users.some((el) => el.email === Email_to_check);
  if (insert) {
    return response.status(401).send({ status: 401, message: `${'Hey !! This Email' + ' '}${Email_to_check} ` + 'has already exist' });
  }
  users.push(newUser);
  return response.status(201).send({ status: 201, message: `${'Hey !! this  User' + ' '}${Name_to_display} ` + ' has created successfully', data: newUser });
});


app.put('/users/:id', (request, response) => {
  const checkuser = users.find((userId) => userId.id === parseInt(request.params.id, 10));
  const userid = request.params.id;
  if (!checkuser) {
    return response.status(404).send({ status: 404, message: `${'Hey !! User with id' + ' '}${userid} ` + 'is not found' });
  }
  const update_body = {
    id: checkuser.id,
    category: request.body.category,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    address: request.body.address,
    bio: request.body.bio,
    occupation: request.body.occupation,
    expertise: request.body.expertise,
    password: request.body.password,
    confirm_password: request.body.confirm_password,

  };


  const target_user = users.indexOf(checkuser);
  users.splice(target_user, 1, update_body);
  return response.status(204).send({ status: 204, message: `${'Hey !! User with id' + ' '}${userid} ` + 'has updated Successfully', data: users });
});


app.delete('/users/:id', (request, response) => {
  const checkuser = users.find((userId) => userId.id === parseInt(request.params.id, 10));
  const userid = request.params.id;
  if (!checkuser) {
    return response.status(404).send({ status: 404, message: `${'Hey !! User with id' + ' '}${userid} ` + 'is not found' });
  }
  const target = users.indexOf(checkuser);
  users.splice(target, 1);
  return response.status(204).send({ status: 204, message: `${'Hey !! User with id' + ' '}${userid} ` + 'has deleted Successfully', data: users });
});


const port = 1000;
app.listen(port, console.log(`App is running on port ${port}`));


module.exports = app;
