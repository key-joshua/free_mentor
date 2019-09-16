import testuser from './testDB';
import chai from 'chai';
import {expect}from 'chai';
import chaiHttp from 'chai-http';
import app from '../main';
chai.use(chaiHttp);
const router = () => chai.request(app);


describe('my Testing suite',()=>{
    const received_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaG9vc2VfaWRfYXNfZGV0YWlsX3RvX3N0b3JlIjoxLCJjaG9vc2VfY2F0ZWdvcnlfYXNfZGV0YWlsX3RvX3N0b3JlIjoiYWRtaW4iLCJjaG9vc2VfZmlyc3ROYW1lX2FzX2RldGFpbF90b19zdG9yZSI6Impvc2h1YSIsImNob29zZV9lbWFpbF9hc19kZXRhaWxfdG9fc3RvcmUiOiJrLmpvc2h1YTg1NUBnbWFpbC5jb20iLCJpYXQiOjE1Njg2NDYyOTcsImV4cCI6MjQzMjY0NjI5N30.LKPSUm-Is76EAwoMgAyy7mOCZZPkJQ5GorDryFHYANc`;
    const nothing_token =`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Njg1Nzg2MTQsImV4cCI6MTYwNDU3ODYxNH0.eooHuF1n1-ojNdh6yfBb92kPYrR0uIkxz8xKvk6tSc0`;
    const empty_amin_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaG9vc2VfaWRfYXNfZGV0YWlsX3RvX3N0b3JlIjo4LCJjaG9vc2VfY2F0ZWdvcnlfYXNfZGV0YWlsX3RvX3N0b3JlIjoiYWRtaW4iLCJjaG9vc2VfZmlyc3ROYW1lX2FzX2RldGFpbF90b19zdG9yZSI6IkVyaWMiLCJjaG9vc2VfZW1haWxfYXNfZGV0YWlsX3RvX3N0b3JlIjoiRWJ1bHVAZ21haWwuY29tIiwiaWF0IjoxNTY4NjIwODU4LCJleHAiOjI0MzI2MjA4NTh9.z5WtuKgSi_GXy0ewTEH_dtmJAQ-hYQayI52OUqSLlH0`; 
    const admin_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaG9vc2VfaWRfYXNfZGV0YWlsX3RvX3N0b3JlIjo4LCJjaG9vc2VfY2F0ZWdvcnlfYXNfZGV0YWlsX3RvX3N0b3JlIjoiYWRtaW4iLCJjaG9vc2VfZmlyc3ROYW1lX2FzX2RldGFpbF90b19zdG9yZSI6IkVyaWMiLCJjaG9vc2VfZW1haWxfYXNfZGV0YWlsX3RvX3N0b3JlIjoiRWJ1bHVAZ21haWwuY29tIiwiaWF0IjoxNTY4NjE5NjQzLCJleHAiOjI0MzI2MTk2NDN9.C-424U7mfq-owpdOPlQOAAj_zcV3AtBaUcoQRuNFDLs `;
    const mentor_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaG9vc2VfaWRfYXNfZGV0YWlsX3RvX3N0b3JlIjo1LCJjaG9vc2VfY2F0ZWdvcnlfYXNfZGV0YWlsX3RvX3N0b3JlIjoibWVudG9yIiwiY2hvb3NlX2ZpcnN0TmFtZV9hc19kZXRhaWxfdG9fc3RvcmUiOiJBbmdlIiwiY2hvb3NlX2VtYWlsX2FzX2RldGFpbF90b19zdG9yZSI6InRlc3Q0QGdtYWlsLmNvbSIsImlhdCI6MTU2ODYxOTgyNSwiZXhwIjoyNDMyNjE5ODI1fQ.y2v5hSSXYq87Od2KNZzOPcTetFdCW1zQdRUYRHx4YZ0`;
    const mentee_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaG9vc2VfaWRfYXNfZGV0YWlsX3RvX3N0b3JlIjo2LCJjaG9vc2VfY2F0ZWdvcnlfYXNfZGV0YWlsX3RvX3N0b3JlIjoibWVudGVlIiwiY2hvb3NlX2ZpcnN0TmFtZV9hc19kZXRhaWxfdG9fc3RvcmUiOiJuZWxseSIsImNob29zZV9lbWFpbF9hc19kZXRhaWxfdG9fc3RvcmUiOiJ0ZXN0NUBnbWFpbC5jb20iLCJpYXQiOjE1Njg2NzUyMDksImV4cCI6MjQzMjY3NTIwOX0.52NlZwa2NWHo-pkyGtc5zahDVfuHYkDBPdTd4naU3qU`;
    
    it('it should be able to display welcome message for all the users',(done)=>{
        router()
        .get(`/api/v1/`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('users should be able to update  profile',(done)=>{
        const userId =1;
        router()
        .patch(`/api/v1/user/${userId}`)
        .send(testuser[1])
        .end((error,response)=>{
            expect(response).to.have.status(500)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })
    
    it('it should be able to return all the users',(done)=>{
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

    it('it should not be able to return all the users',(done)=>{
        router()
        .get('/api/v1/users')
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('it should be able to return specific admin with adminId',(done)=>{
        const adminId =8;
        router()
        .get(`/api/v1/admins/${adminId}`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`it should not be able to return specific admin when id exist but not id of admin`,(done)=>{
        const adminId =2;
        router()
        .get(`/api/v1/admins/${adminId}`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`it should not be able to return specific admin when id doesn't exist`,(done)=>{
        const adminId =1000;
        router()
        .get(`/api/v1/admins/${adminId}`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`it should not be able to return specific admin without token`,(done)=>{
        const adminId =1;
        router()
        .get(`/api/v1/admins/${adminId}`)
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })
    
    it('it should be able to return all admins',(done)=>{
        router()
        .get(`/api/v1/admins`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            expect(response.body.data).to.be.a('array')
            done(error)
        })
    })

    it('it should not be able to return all admins without token',(done)=>{
        router()
        .get(`/api/v1/admins`)
        .set('Authorization', mentor_token)
        .end((error,response)=>{
            expect(response).to.have.status(300)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('it should not be able to return all admins without token',(done)=>{
        router()
        .get(`/api/v1/admins`)
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('it should be able to return  a mentor',(done)=>{
        const mentorId = 5;
        router()
        .get(`/api/v1/mentors/${mentorId}`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('it should not be able to return  a mentor without token',(done)=>{
        const mentorId = 5;
        router()
        .get(`/api/v1/mentors/${mentorId}`)
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`it should not be able to return  a mentor with mentorId which doesn't exist in database`,(done)=>{
        const mentorId = 1000;
        router()
        .get(`/api/v1/mentors/${mentorId}`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`it should not be able to return a mentor with mentorId which is wrong`,(done)=>{
        const mentorId = 1;
        router()
        .get(`/api/v1/mentors/${mentorId}`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('it should be able to return all mentees',(done)=>{
        router()
        .get(`/api/v1/mentees`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })
    
    it('it should be able to return a mentee',(done)=>{
        const menteeId = 3;
        router()
        .get(`/api/v1/mentees/${menteeId}`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('it should not be able to return  a mentee without token',(done)=>{
        const menteeId = 3;
        router()
        .get(`/api/v1/mentees/${menteeId}`)
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`it should not be able to return  a mentee with mentorId which doesn't exist in database`,(done)=>{
        const menteeId = 1000;
        router()
        .get(`/api/v1/mentees/${menteeId}`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            done(error)
        })
    })

    it(`it should not be able to return  a mentee with mentorId which is wrong`,(done)=>{
        const menteeId = 1;
        router()
        .get(`/api/v1/mentees/${menteeId}`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            done(error)
        })
    })

    it('it should be able to return all the mentors',(done)=>{
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

    it('it should not be able to return all the mentors',(done)=>{
        router()
        .get('/api/v1/mentors')
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentee should be able to return a mentor when has correct token and mentorId',(done)=>{
        const mentorId =2;
        router()
        .get(`/api/v1/mentors/${mentorId}`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })
    
    it('it should not be able to return a mentor when has wrong mentorId',(done)=>{
        const mentorId =1;
        router()
        .get(`/api/v1/mentors/${mentorId}`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('it should not be able to return metor without token',(done)=>{
        const mentorId =3;
        router()
        .get(`/api/v1/mentors/${mentorId}`)
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('it should not be able to return a mentor when has wrong both token and mentorId',(done)=>{
        const mentorId =1000000000;
        router()
        .get(`/api/v1/mentors/${mentorId}`)
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('it should be able to return all session',(done)=>{
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
    
    it('it should not be able to return all session',(done)=>{
        router()
        .get(`/api/v1/sessions`)
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('it should not be able to return all session',(done)=>{
        router()
        .get(`/api/v1/sessions`)
        .set('Authorization', empty_amin_token)
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentee should be able to return all session',(done)=>{
        router()
        .get(`/api/v1/session`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            expect(response.body.data).to.be.a('array')
            done(error)
        })
    })

    it('mentor should be able to return all session',(done)=>{
        router()
        .get(`/api/v1/session`)
        .set('Authorization', mentor_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            expect(response.body.data).to.be.a('array')
            done(error)
        })
    })

    it('admin should be able to view session by id',(done)=>{
        const sessionId = 3;
        router()
        .get(`/api/v1/sessions/${sessionId}`)
        .set('Authorization', empty_amin_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            expect(response.body.data).to.be.a('array')
            done(error)
        })
    })

    it('admin should not be able to view session by wrong id',(done)=>{
        const sessionId = 1000;
        router()
        .get(`/api/v1/sessions/${sessionId}`)
        .set('Authorization', empty_amin_token)
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`it should not be able to view mentee's session by wrong id`,(done)=>{
        const menteeId = 1000;
        router()
        .get(`/api/v1/sessionsmentee/${menteeId}`)
        .set('Authorization', empty_amin_token)
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`it should be able to view mentee's session by live id`,(done)=>{
        const menteeId = 4;
        router()
        .get(`/api/v1/sessionsmentee/${menteeId}`)
        .set('Authorization', empty_amin_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    
    it(`it should not be able to view mentor's session by wrong id`,(done)=>{
        const mentorId = 1000;
        router()
        .get(`/api/v1/sessionsmentee/${mentorId}`)
        .set('Authorization', empty_amin_token)
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`it should be able to view mentor's session by live id`,(done)=>{
        const mentorId = 5;
        router()
        .get(`/api/v1/sessionsmentor/${mentorId}`)
        .set('Authorization', empty_amin_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('it should be able to return all review',(done)=>{
        router()
        .get(`/api/v1/reviews`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            expect(response.body.data).to.be.a('array')
            done(error)
        })
    })

    it('it should not be able to review when is not mentee',(done)=>{
        const sessionId = 1;
        router()
        .post(`/api/v1/sessions/${sessionId}/review`)
        .set('Authorization', mentor_token)
        .end((error,response)=>{
            expect(response).to.have.status(300)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('it should not be able to return any review when there is no review into database ',(done)=>{
        router()
        .get(`/api/v1/reviews`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            expect(response.body.data).to.be.a('array')
            done(error)
        })
    })

    it('it should not be able to return all review without token',(done)=>{
        router()
        .get(`/api/v1/reviews`)
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('user should be able to signup',(done)=>{
        router()
        .post('/api/v1/signup')
        .send(testuser[0])
        .end((error,response)=>{
            expect(response).to.have.status(201)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })
    
    it('user should not be able to signup with existing email',(done)=>{
        router()
        .post('/api/v1/signup')
        .send(testuser[9])
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('user should not be able to signup without email',(done)=>{
        router()
        .post('/api/v1/signup')
        .send(testuser[8])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })


    it('user should not be able to signup without first name ',(done)=>{
            router()
            .post('/api/v1/signup')
            .send(testuser[18])
            .end((error,response)=>{
                expect(response).to.have.status(400)
                expect(response.body).to.be.a('object')
                expect(response.body).to.have.property('message')
                done(error)
            })
        })

    it('user should not be able to signup without last name ',(done)=>{
            router()
            .post('/api/v1/signup')
            .send(testuser[19])
            .end((error,response)=>{
                expect(response).to.have.status(400)
                expect(response.body).to.be.a('object')
                expect(response.body).to.have.property('message')
                done(error)
            })
        })

    it('user should not be able to signup without expertise ',(done)=>{
        router()
        .post('/api/v1/signup')
        .send(testuser[20])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('user should not be able to signup without password',(done)=>{
        router()
        .post('/api/v1/signup')
        .send(testuser[21])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('user should not be able to signup without confirmation password',(done)=>{
        router()
        .post('/api/v1/signup')
        .send(testuser[10])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('user should be able to signin',(done)=>{
        router()
        .post('/api/v1/signin')
        .send(testuser[1])
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('user should not be able to signin without email',(done)=>{
        router()
        .post('/api/v1/signin')
        .send(testuser[22])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('user should not be able to signin without password',(done)=>{
        router()
        .post('/api/v1/signin')
        .send(testuser[23])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('user should not be able to signin with wrong account info',(done)=>{
        router()
        .post('/api/v1/signin')
        .send(testuser[7])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentee should be able to post sessions with token',(done)=>{
        router()
        .post('/api/v1/session')
        .set('Authorization', received_token)
        .send(testuser[2])
        .end((error,response)=>{
            expect(response).to.have.status(201)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentee should not be able to post sessions without token',(done)=>{
        router()
        .post('/api/v1/session')
        .send(testuser[2])
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentee should not be able to post sessions without live mentorId',(done)=>{        
        router()
        .post('/api/v1/session')
        .set('Authorization', received_token)
        .send(testuser[5])
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentee should not be able to post sessions with menteeId',(done)=>{
        router()
        .post('/api/v1/session')
        .set('Authorization', received_token)
        .send(testuser[6])
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentee should not be able to post sessions without menteeId',(done)=>{
        router()
        .post('/api/v1/session')
        .set('Authorization', received_token)
        .send(testuser[28])
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentee should not be able to post sessions without quesstion',(done)=>{
        router()
        .post('/api/v1/session')
        .set('Authorization', received_token)
        .send(testuser[29])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    
    it('mentee should  be able to post review with token and live sessionId' ,(done)=>{
        const sessionId =2;
        router()
        .post(`/api/v1/sessions/${sessionId}/review`)
        .set('Authorization', received_token)
        .send(testuser[4])
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)

        })
    })


    it('mentee should not be able to post review without live sessionId',(done)=>{
        const sessionId =10;
        router()
        .post(`/api/v1/sessions/${sessionId}/review`)
        .set('Authorization', received_token)
        .send(testuser[4])
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
            
        })
    })

    it('mentee should not be able to post review without input score',(done)=>{
        const sessionId =3;
        router()
        .post(`/api/v1/sessions/${sessionId}/review`)
        .send(testuser[24])
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
            
        })
    })

    it('mentee should not be able to post review without input remark',(done)=>{
        const sessionId =3;
        router()
        .post(`/api/v1/sessions/${sessionId}/review`)
        .send(testuser[25])
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
            
        })
    })

    it('mentee should not be able to post review without input remark',(done)=>{
        const sessionId =3;
        router()
        .post(`/api/v1/sessions/${sessionId}/review`)
        .send(testuser[26])
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
            
        })
    })

    it('mentee should not be able to post review without token',(done)=>{
        const sessionId =2;
        router()
        .post(`/api/v1/sessions/${sessionId}/review`)
        .send(testuser[4])
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
            
        })
    })

    it('mentee or mentor should not be able to view his/her session without token to provide menteeId or mentorId ' ,(done)=>{
        router()
        .post(`/api/v1/sessions`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            done(error)

        })
    })

    it('mentee or mentor should not be able to view his/her session without token to provide menteeId or mentorId ' ,(done)=>{
        router()
        .post(`/api/v1/sessions`)
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            done(error)

        })
    })

    it('mentor should be able to accept the session',(done)=>{
        const sessionId =1;
        router()
        .patch(`/api/v1/sessions/${sessionId}/accept`)
        .set('Authorization', empty_amin_token)
        .send(testuser[14])
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentor should not be able to accept the session when is not a mentor',(done)=>{
        const sessionId =1;
        router()
        .patch(`/api/v1/sessions/${sessionId}/accept`)
        .set('Authorization', mentee_token)
        .send(testuser[14])
        .end((error,response)=>{
            expect(response).to.have.status(300)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentor should not be able to accept the session without keyword "accepted"',(done)=>{
        const sessionId =1;
        router()
        .patch(`/api/v1/sessions/${sessionId}/accept`)
        .set('Authorization', received_token)
        .send(testuser[15])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`mentor should not be able to accept the session when session already's accepted `,(done)=>{
        const sessionId = 5;
        router()
        .patch(`/api/v1/sessions/${sessionId}/accept`)
        .set('Authorization', received_token)
        .send(testuser[14])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`mentor should not be able to accept the session when session already's rejected`,(done)=>{
        const sessionId =2;
        router()
        .patch(`/api/v1/sessions/${sessionId}/accept`)
        .set('Authorization', received_token)
        .send(testuser[16])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })
    it(`mentor should not be able to accept the session without token`,(done)=>{
        const sessionId =1;
        router()
        .patch(`/api/v1/sessions/${sessionId}/accept`)
        .send(testuser[14])
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`mentor should not be able to reject the session without token`,(done)=>{
        const sessionId =1;
        router()
        .patch(`/api/v1/sessions/${sessionId}/reject`)
        .send(testuser[14])
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentor should not be able to accept the session without live sessionId',(done)=>{
        const sessionId =10000;
        router()
        .patch(`/api/v1/sessions/${sessionId}/accept`)
        .set('Authorization', received_token)
        .send(testuser[14])
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentor should be able to reject the session with keyword "rejected"',(done)=>{
        const sessionId =4;
        router()
        .patch(`/api/v1/sessions/${sessionId}/reject`)
        .set('Authorization', received_token)
        .send(testuser[16])
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentor should not be able to reject the session without live sessionId',(done)=>{
        const sessionId =100000;
        router()
        .patch(`/api/v1/sessions/${sessionId}/reject`)
        .set('Authorization', received_token)
        .send(testuser[17])
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })
    it('mentor should not be able to reject the session without keyword "rejected" ',(done)=>{
        const sessionId =1;
        router()
        .patch(`/api/v1/sessions/${sessionId}/reject`)
        .set('Authorization', received_token)
        .send(testuser[15])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('mentor should not be able to accept the session without live sessionId',(done)=>{
        const sessionId =100000;
        router()
        .patch(`/api/v1/sessions/${sessionId}/accept`)
        .set('Authorization', received_token)
        .send(testuser[17])
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('Admin should be able to change  a mentee to mentor',(done)=>{
        const mentee =1;
        router()
        .patch(`/api/v1/users_mentor_or_mentee/${mentee}`)
        .set('Authorization', received_token)
        .send(testuser[3])
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('Admin should not be able to change a mentee to mentor without token',(done)=>{
        const mentee =1;
        router()
        .patch(`/api/v1/users_mentor_or_mentee/${mentee}`)
        .send(testuser[3])
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('Admin should not change a mentor to mentee when user already is mentee',(done)=>{
        const mentee =3;
        router()
        .patch(`/api/v1/users_mentor_or_mentee/${mentee}`)
        .set('Authorization', received_token)
        .send(testuser[3])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('Admin should not change a mentor to mentee or mentee to mentor or mentee to admin or admin to mentee or .. when keyword is mentor, mentee or admin',(done)=>{
        const mentee =3;
        router()
        .patch(`/api/v1/users_mentor_or_mentee/${mentee}`)
        .set('Authorization', received_token)
        .send(testuser[27])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`Admin should not change a mentor to mentee when id doesn't exist`,(done)=>{
        const mentee =1000;
        router()
        .patch(`/api/v1/users_mentor_or_mentee/${mentee}`)
        .set('Authorization', received_token)
        .send(testuser[3])
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('Admin should not change a mentor to mentee when ...',(done)=>{
        const mentee =1;
        router()
        .patch(`/api/v1/users_mentor_or_mentee/${mentee}`)
        .set('Authorization',  received_token)
        .send(testuser[27])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })
    
    it(' Admin should be able to delete review',(done)=>{
        const sessionId =5;
        router()
        .delete(`/api/v1/sessions/${sessionId}/review`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })
    
    it(' Admin should not be able to delete review without Token',(done)=>{
        const sessionId =5;
        router()
        .delete(`/api/v1/sessions/${sessionId}/review`)
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it(`Admin should not be able to delete review with sessionId doesn't exist`,(done)=>{
        const sessionId =10;
        router()
        .delete(`/api/v1/sessions/${sessionId}/review`)
        .set('Authorization', received_token)
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('users should be able to update  profile',(done)=>{
        const userId =1;
        router()
        .patch(`/api/v1/user/${userId}`)
        .set('Authorization', empty_amin_token)
        .send(testuser[1])
        .end((error,response)=>{
            expect(response).to.have.status(401)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })
    it('users should be able to update  profile',(done)=>{
        const userId =1;
        router()
        .patch(`/api/v1/user/${userId}`)
        .set('Authorization', empty_amin_token)
        .send(testuser[32])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('users should not be able to update  profile when userId is incorrect',(done)=>{
        const userId =10000;
        router()
        .patch(`/api/v1/user/${userId}`)
        .set('Authorization', received_token)
        .send(testuser[1])
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('users should be able to update  password',(done)=>{
        const userId =1;
        router()
        .patch(`/api/v1/password/${userId}`)
        .set('Authorization', empty_amin_token)
        .send(testuser[11])
        .end((error,response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('users should not be able to update  password when userId is incorrect',(done)=>{
        const userId =10000;
        router()
        .patch(`/api/v1/password/${userId}`)
        .set('Authorization', received_token)
        .send(testuser[11])
        .end((error,response)=>{
            expect(response).to.have.status(404)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('users should not be able to update  password when old password is the same with new password',(done)=>{
        const userId =1;
        router()
        .patch(`/api/v1/password/${userId}`)
        .set('Authorization', received_token)
        .send(testuser[12])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('users should not be able to update  password when confirm password is not equal to old password ',(done)=>{
        const userId =1;
        router()
        .patch(`/api/v1/password/${userId}`)
        .set('Authorization', received_token)
        .send(testuser[13])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })

    it('users should not be able to update  without password ',(done)=>{
        const userId =1;
        router()
        .patch(`/api/v1/password/${userId}`)
        .set('Authorization', received_token)
        .send(testuser[13])
        .end((error,response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.be.a('object')
            expect(response.body).to.have.property('message')
            done(error)
        })
    })



})
