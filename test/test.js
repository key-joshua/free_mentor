const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const app = require('../main');

chai.use(chaiHttp);
const router = () => chai.request(app);

const testuser=
[
    {
        
        category: "user",
        firstName: "joshua",
        lastName: "kayigamba",
        email: "k.joshua855@gmai.com",
        address: "kmpala/Uganda",
        bio: "Programming",
        occupation: "free-lacer",
        expertise: "I.T",
        password: "qwerty",
    }
];

    
describe('my Testing suite',()=>{
    it('should return all the users',(done)=>{
        router()
        .get('/api/v1/users')
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            expect(response.body.data).to.be.a('array')
            done(error)
        })
    })

    it('should post a user',(done)=>{
        router()
        .post('/api/v1/auth/signup')
        .send(testuser)
        .end((error,response)=>{
            expect(response).to.have.status(201)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            // expect(response.body.data).to.have.property('object')
            done(error)
        })
    })

    it('should Update a user',(done)=>{
        router()
        .patch('/api/v1/users/1')
        .send(testuser)
        .end((error,response)=>{
            expect(response).to.have.status(204)
            expect(response.body).to.be.a('object')
            // expect(response.body).to.have.property('message')
            // expect(response.body.data).to.have.property('object')
            done(error)
        })
    })
})
