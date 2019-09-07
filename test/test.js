import testuser from './testDB';
import testsession from './sessionDB';
import chai from 'chai';
import {expect}from 'chai';
import chaiHttp from 'chai-http';
import app from '../main';
import usersDB from '../server/api/models/usersDB';
chai.use(chaiHttp);
const router = () => chai.request(app);


describe('my Testing suite',()=>{
    const received_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Njc4NDUzNjEsImV4cCI6MTU2NzkzMTc2MX0.XhQYkONgKtE07So_xErNpV4fwaew6oQzUWCS9nHH2a4';
    
    it('should return all the users',(done)=>{
        router()
        .get('/api/v1/users')
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            expect(response.body.data).to.be.a('array')
            done(error)
        })
    })

    it('should not return all the users',(done)=>{
        router()
        .get('/api/v1/users')
        .end((error,response)=>{
            expect(response).to.have.status(500)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('should return all the mentors',(done)=>{
        router()
        .get('/api/v1/mentors')
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            expect(response.body.data).to.be.a('array')
            done(error)
        })
    })

    it('should not return all the mentors',(done)=>{
        router()
        .get('/api/v1/mentors')
        .end((error,response)=>{
            expect(response).to.have.status(500)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })


    
        it('should return a mentor',(done)=>{
        const mentorId =3;
        router()
        .get(`/api/v1/mentors/${mentorId}`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            expect(response.body.data).to.be.a('array')
            done(error)
        })
    })

    it('should not return a mentor',(done)=>{
        const mentorId =3;
        router()
        .get(`/api/v1/mentors/${mentorId}`)
        .end((error,response)=>{
            expect(response).to.have.status(500)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('should return all session',(done)=>{
        router()
        .get(`/api/v1/sessions`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            expect(response.body.data).to.be.a('array')
            done(error)
        })
    })

    
    it('should not return all session',(done)=>{
        router()
        .get(`/api/v1/sessions`)
        .end((error,response)=>{
            expect(response).to.have.status(500)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('user should signup',(done)=>{
        router()
        .post('/api/v1/auth/signup')
        .send(testuser[0])
        .end((error,response)=>{
            expect(response).to.have.status(201)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('user should signin',(done)=>{
        router()
        .post('/api/v1/auth/signin')
        .send(testuser[1])
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('user should post sessions',(done)=>{
        router()
        .post('/api/v1/sessions')
        .set('Authorization', received_token)
        .send(testsession[0])
        .end((error,response)=>{
            expect(response).to.have.status(201)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('user should not post sessions',(done)=>{
        router()
        .post('/api/v1/sessions')
        .send(testsession[0])
        .end((error,response)=>{
            expect(response).to.have.status(500)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    



    // it('should Update a user',(done)=>{
    //     router()
    //     .patch('/api/v1/users/1')
    //     .send(testuser)
    //     .end((error,response)=>{
    //         expect(response).to.have.status(204)
    //         expect(response.body).to.be.a('object')
    //         // expect(response.body).to.have.property('message')
    //         // expect(response.body.data).to.have.property('object')
    //         done(error)
    //     })
    // })
})
