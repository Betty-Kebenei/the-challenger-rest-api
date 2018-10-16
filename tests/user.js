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

describe.only('Register User', () => {
    beforeEach((done) => {
        User.remove({}).then(() => {
            User.insertMany(users)
        }).then(() => done())
    });

    it('should register a user successfully', (done) => {
        let user = {
            _id: new ObjectId(),
            username: 'bgal',
            email: 'bgal@gmail.com',
            password: '@lagb4cdp'
        }
        let response = {message: 'User successfully created!', user: user};
        request(app)
        .post('/api/v1/signup')
        .send(user)
        .expect(201)
        .expect((res) => {
            expect(res.body.message).toBe(response.message);
            expect(res.body.user).toBe(response.user);
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
            _id: new ObjectId(),
            username: 'bgal',
            password: '@lagb4cdp'
        }
        let response = {message: 'User validation failed: Email is required.'};
        request(app)
        .post('/api/v1/signup')
        .send(user)
        .expect(400)
        .end((error) => {
            if(error) {
                return done(error);
            }
            expect(res.error.text).toBe(response.message);
            User.find().then((res) => {
                expect(res.length).toBe(1);
                done();
            }).catch((error) => done(error));
        });
    });

    it('should return an error if password is not provided', (done) => {
        let user = {
            _id: new ObjectId(),
            username: 'bgal',
            email: 'bgal@gmail.com'
        }
        let response = {message: 'User validation failed: Password is required.'};
        request(app)
        .post('/api/v1/signup')
        .send(user)
        .expect(400)
        .end((error) => {
            if(error) {
                return done(error);
            }
            expect(res.error.text).toBe(response.message);
            User.find().then((res) => {
                expect(res.length).toBe(1);
                done();
            }).catch((error) => done(error));
        });
    });

    it('should return an error if a duplicate email is used for registration', (done) => {
        let user = {
            _id: new ObjectId(),
            username: 'someone',
            email: 'berry@gmail.com',
            password: '@someone5cdp' 
        }
        let response = {message: 'User with that email already exists. Please user another email.'};
        request(app)
        .post('/api/v1/signup')
        .send(user)
        .expect(400)
        .end((error) => {
            if(error) {
                return done(error);
            }
            expect(res.error.text).toBe(response.message);
            User.find().then((res) => {
                expect(res.length).toBe(1);
                done();
            }).catch((error) => done(error));
        });
    });
});