[![Build Status](https://travis-ci.org/key-joshua/free_mentors.svg?branch=develop)](https://travis-ci.org/key-joshua/free_mentors)
[![Coverage Status](https://coveralls.io/repos/github/key-joshua/free_mentors/badge.svg?branch=develop)](https://coveralls.io/github/key-joshua/free_mentors?branch=develop)
# Free Mentors
Free Mentors is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions.
<br>


## Features

- All users  they Landing on Home page of Free Mentors Application.
- All Users can sign up to get free account on Free Mentors Application.
- All Users who have acoount on Free Mentors Application can sign in.
- All Users who sign in can change password.
- All Users who sign in can update profile.

- Mentee can view all mentors.
- Mentee can view a specific mentor profile.
- Mentee can create a mentorship session request.
- Mentee can view all mentorship sessions requested by him.
- Mentee can create a review after a mentorship session.
- Mentee can view mentorship review.

- Mentor can view all mentorship sessions request to him.
- Mentor can accept a mentorship session request.
- Mentor can reject a mentorship session request.

- Admins also can change a mentee to mentor.
- Admins also can change a mentor to mentee.
- Admins also can change a mentor to admin.
- Admins also can change a admin to mentor.
- Admins also can change a admin to mentee.

- Admin can view all Admins.
- Admin can view all Mentor.
- Admin can view all Mentee.

- Admin can view all mentorship sessions.
- Admin can view all mentorship reviews.
- Admin can delete a Mentee, Mentor or admin.
- Admin can delete a mentorship review deemed inappropriate.
- Admin can delete a mentorship sessions deemed inappropriate.
 <br>

## Visit Free_Mentor UI Templates

Before we get started Remember to take  :coffee:   :pizza:  and :dancer:   When You Are coding, come on men it all about way of to calumn down and relax
 <br>

 ## Frontend tools

 - HTML
 - CSS 
 - Javascript

#### Get into Free_Mentor UI Template by Visiting Thoses link below
This, It all about what i have been requested (recommanded) in the instructions to hosting UI Template in github using this gh-pages branch and right now my UI Template Application is Hosted [Free Mentors Application](https://key-joshua.github.io/free_mentors/) and notice this is the V1 api so make sure to put /api/v1/ before any route eg: https://free-mentors-1000.herokuapp.com/api/v1/documentation/.

- [Free Mentors (Mentee side)](https://key-joshua.github.io/free_mentors/)
- [Free Mentors (Mentor side)](https://key-joshua.github.io/free_mentors/UI/html/mentors_view_sessions.html)
- [Free Mentors (Admin side)](https://key-joshua.github.io/free_mentors/UI/html/admins_view_users.html)
- [Api Root Heroku](https://free-mentors-1000.herokuapp.com)
- [Api Documentation](https://free-mentors-1000.herokuapp.com/api/v1/documentation/)


## Backend tools

 - NodeJs
 - Express JS
 - Mocha
 - Chai
 - Neccessary libraties

  
#### TABLE OF END POINTS SPECIFICATION AND DESCRIPTION

| VERBS  | ENDPOINTS                        | STATUS   | ACCESS                  | DESCRIPTION                       |
|--------|----------------------------------|----------|-------------------------|-----------------------------------|
| POST   | /signup/                         |  201 OK  | public                  | create an account then get token  |
| POST   | /signin/                         |  200 OK  | public                  | login to the app then get token   |
| PATCH  | /user/                           |  200 OK  | private(user)           | update your profile               |
| PATCH  | /passwords/                      |  200 OK  | private(user)           | update your password              |
| GET    | /mentors/                        |  200 OK  | public                  | view all mentors                  |
| GET    | /admins/                         |  200 OK  | private(admin only)     | view all admins                   |
| GET    | /mentees                         |  200 OK  | public                  | view all mentees                  |
| GET    | /mentors/:mentorId/              |  200 OK  | public                  | view specific mentor              |
| POST   | /sessions/                       |  201 OK  | public                  | create a session                  |
| GET    | /sessions/                       |  200 OK  | private(mente & mentor) | view your created session         |
| POST   | /sessions/:sessionId/review/     |  201 OK  | private(mentee & admin) | create a review                   |
| GET    | /reviews/                        |  200 OK  | private(user)           | view your created review          |
| PATCH  | /sessions/:sessionId/accepts/    |  200 OK  | private(mentor & admin) | accept created session to you     |
| PATCH  | /sessions/:sessionId/rejects/    |  200 OK  | private(mentor & admin) | reject created session to you     |
| PATCH  | /users_mentor_or_mentee/:userId/ |  200 OK  | private(admin only)     | change users to other category    |
| GET    | /review/                         |  200 OK  | private(admin only)     | view all created review           |
| GET    | /session/                        |  200 OK  | private(admin only)     | view all created sessions         |
| DELETE | /user/                           |  200 OK  | private(admin only)     | delete registered user            |
| DELETE | /sessions/:sessionId/            |  200 OK  | private(admin only)     | delete created sessions           |
| DELETE | /sessions/:sessionId/review/     |  200 OK  | private(admin only)     | delete created review             |

#### Other Tools

Other tools and technologies used in development of this application are;
- Hoster: [Heroku]().
- Pivotal Tracker:[PT](https://www.pivotaltracker.com/n/projects/2379610).
- Style Guide: [Airbnb](https://airbnb.io/projects/javascript/).
- Framework: [ExpressJS](http://expressjs.com/).
- Compiler: [Babel](https://babeljs.io/).
- Integrate: [TravisCI](https://travis-ci.org/key-joshua/free_mentors).
- Integrate: [Coveralls](https://coveralls.io/github/key-joshua/free_mentors).
- Documentation: [Swagger](https://swagger.io/).
- Linting Library: [ESLint](https://eslint.org/).
- API Testing environment: [Postman](https://www.getpostman.com).
- Programming language: [JavaScript(ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/).
- Text Editor: [VSCode](https://code.visualstudio.com), [Sublime Text](https://www.sublimetext.com/).

#### Getting Started

1. Clone the github repository [here](https://key-joshua.github.io/free_mentors). 
2. Kindly read very well the provided swagger documentation

- Clone this project on your machine , by running this command on in your command line or Terminal:
 ```
git clone https://github.com/key-joshua/free_mentors.git
 ```
 - Install the required dependencies found in package.json by running this command:
 ```
npm install
 ```
 - And then to start running  this project on your machine , run this command:
 ```
npm run server
 ```
 - then to run test, run this command:
 ```
npm run test
```
#### Api Documentation

Get started with Free Mentors Api endpoints swagger documentation locally after clone project [here](http://localhost:2000/api/v1/documentation).



#### Deployment
- gh-pages : [Free_Mentors](https://key-joshua.github.io/free_mentors/).

#### Dedicated: [Andela-Developer-Challenge](https://andela.com/).

#### Develoer: [Key Joshua](https://www.instagram.com/key_joshua/).