import User from '../server/models/userModel';
import app from '../server/app';

import expect from 'expect';
import request from 'supertest';
import {ObjectId} from 'mongodb';

let users = [
    {
        _id: new ObjectId(),
        username: 'berry',
        email: 'berry@gmail.com',
        password: '@yrreb5cdp' 
    }
] 

describe('Register User', () => {
    beforeEach((done) => {
        User.remove({}).then(() => {
            User.insertMany(users)
        }).then(() => done())
    });

    it('should register a user successfully', (done) => {
        let user = {
            username: 'bgal',
            email: 'bgal@gmail.com',
            password: '@lagb4cdp'
        }
        let response = {message: 'User successfully created!', user};
        request(app)
        .post('/api/v1/signup')
        .send(user)
        .expect(201)
        .expect((res) => {
            expect(res.body.message).toBe(response.message);
        })
        .end((error) => {
            if(error) {
                return done(error);
            }
            User.find().then((res) => {
                expect(res.length).toBe(2);
                done();
            }).catch((error) => done(error));
        });
    });
    
    it('should return an error if email is not provided', (done) => {
        let user = {
            username: 'bgal',
            password: '@lagb4cdp'
        }
        let response = {message: 'User validation failed: Email is required.'};
        request(app)
        .post('/api/v1/signup')
        .send(user)
        .expect(400)
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            expect(res.error.text).toContain(response.message);
            User.find().then((res) => {
                expect(res.length).toBe(1);
                done();
            }).catch((error) => done(error));
        });
    });

    it('should return an error if password is not provided', (done) => {
        let user = {
            username: 'bgal',
            email: 'bgal@gmail.com'
        }
        let response = {message: 'User validation failed: Password is required.'};
        request(app)
        .post('/api/v1/signup')
        .send(user)
        .expect(400)
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            expect(res.error.text).toContain(response.message);
            User.find().then((res) => {
                expect(res.length).toBe(1);
                done();
            }).catch((error) => done(error));
        });
    });

    it('should return an error if a duplicate email is used for registration', (done) => {
        let user = {
            username: 'someone',
            email: 'berry@gmail.com',
            password: '@someone5cdp' 
        }
        let response = {message: 'User with that email already exists. Please use another email.'};
        request(app)
        .post('/api/v1/signup')
        .send(user)
        .expect(400)
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            expect(res.error.text).toContain(response.message);
            User.find().then((res) => {
                expect(res.length).toBe(1);
                done();
            }).catch((error) => done(error));
        });
    });
 
    it('should return an error if a duplicate username is used for registration', (done) => {
        let user = {
            username: 'berry',
            email: 'someone@gmail.com',
            password: '@someone5cdp' 
        }
        let response = {message: 'User with that username already exists. Please use another username.'};
        request(app)
        .post('/api/v1/signup')
        .send(user)
        .expect(400)
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            expect(res.error.text).toContain(response.message);
            User.find().then((res) => {
                expect(res.length).toBe(1);
                done();
            }).catch((error) => done(error));
        });
    });
});

describe.only('Login User', () => {
    beforeEach((done) => {
        User.remove({}).then(() => {
            User.insertMany(users)
        }).then(() => done())
    });

    it('should successfully login a user with username', (done) => {
        let user = {
            username: 'berry',
            password: '@yrreb5cdp'  
        };
        let response = {message: 'User successfully logged in.'};
        request(app)
        .post('/api/v1/signin')
        .send(user)
        .expect(200)
        .expect((res) => {
            expect(res.body.message).toBe(response.message);
        })
        .end((error) => {
            if(error) {
                return done(error);
            }
            done();
        });
    });

    it('should successfully login a user with email', (done) => {
        let user = {
            email: 'berry@gmail.com',
            password: '@yrreb5cdp' 
        };
        let response = {message: 'User successfully logged in.'};
        request(app)
        .post('/api/v1/signin')
        .send(user)
        .expect(200)
        .expect((res) => {
            expect(res.body.message).toBe(response.message);
        })
        .end((error) => {
            if(error) {
                return done(error);
            }
            done();
        });
    });

    it('should return an error if user is logging in with unexisting username', (done) => {
        let user = {
            username: 'terry',
            password: '@yrreb5cdp' 
        };
        let response = {message: 'User with that username does not exists. Please register.'};
        request(app)
        .post('/api/v1/signin')
        .send(user)
        .expect(400)
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            expect(res.error.text).toContain(response.message);
            done();
        });
    });

    it('should return an error if user is logging in with unregistered email', (done) => {
        let user = {
            email: 'berryberry@gmail.com',
            password: '@yrreb5cdp' 
        };
        let response = {message: 'User with that email does not exists. Please register.'};
        request(app)
        .post('/api/v1/signin')
        .send(user)
        .expect(400)
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            expect(res.error.text).toContain(response.message);
            done();
        });
    });

    it('should return an error if user is logging in with wrong password', (done) => {
        let user = {
            email: 'berry@gmail.com',
            password: 'wrongpassword' 
        };
        let response = {message: 'Wrong password. Try again.'};
        request(app)
        .post('/api/v1/signin')
        .send(user)
        .expect(400)
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            expect(res.error.text).toContain(response.message);
            done();
        });
    });
});
