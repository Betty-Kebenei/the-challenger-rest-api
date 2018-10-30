import User from '../server/models/userModel';
import Month  from '../server/models/monthModel';
import app from '../server/app';
import bcrypt from 'bcrypt';

import expect from 'expect';
import request from 'supertest';
import {ObjectId} from 'mongodb';

let Token = '';

let month = {
    _id: new ObjectId(),
    fromDate: '1/2/2018',
    toDate: '1/3/2018'
}

before((done) => {
    let user = {
        _id: new ObjectId(),
        username: 'berry',
        email: 'berry@gmail.com',
        password: bcrypt.hashSync('@yrreb5cdp', 10)
    }
    User.remove({}).then(() => {
        request(app)
        .post('/api/v1/signup')
        .send(user)
        .expect((res) => {
            Token = res.body.token;
        })
        .end(()=> done())
    })
   
})

describe('GET all months', () => {
    beforeEach((done) => {
        Month.remove({}).then(() => {
            request(app)
            .post('/api/v1/month-form')
            .send(month)
            .set({'token': Token})
            .end((error) => {
                if(error) {
                    return done(error);
                }
                done()
            });
        })
    });
    it('should Get all months if found', (done) => {
        request(app)
        .get('/api/v1/month-form')
        .set({'token': Token})
        .expect(200)
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            expect(res.body.length).toBe(1);
            done();
        });
    });
});

describe('GET one month by id', () => {
    beforeEach((done) => {
        Month.remove({}).then(() => {
            request(app)
            .post('/api/v1/month-form')
            .send(month)
            .set({'token': Token})
            .end((error) => {
                if(error) {
                    return done(error);
                }
                done()
            });
        })
    });
    it('should return the month', (done) => {
        request(app)
        .get(`/api/v1/month-form/${month._id.toHexString()}`)
        .set({'token': Token})
        .expect(200)
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            done();
        });
    });
});

describe('POST months', () => {
    beforeEach((done) => {
        Month.remove({}).then(() => done())
    });
    it('should post the month successfully', (done) => {
        let month = {
            _id: new ObjectId(),
            fromDate: '25/2/2018',
            toDate: '24/3/2018'
        }
        let response = { message: 'Month form successfully created!'}
        request(app)
        .post('/api/v1/month-form')
        .send(month)
        .set({'token': Token})
        .expect(201)
        .expect((res) => {
            expect(res.body.message).toBe(response.message)
        })
        .end((error) => {
            if(error) {
                return done(error);
            }
            Month.find().then((res) => {
                expect(res.length).toBe(1);
                done()
            }).catch((error) => done(error));
        });
    });

    it('should return an error if no values are provided', (done) => {
        request(app)
        .post('/api/v1/month-form')
        .send({})
        .set({'token': Token})
        .expect(400)
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            expect(res.error.text)
            .toContain(
                'Month validation failed: fromDate: Path `fromDate` is required., toDate: Path `toDate` is required.')
            Month.find().then((res) => {
                expect(res.length).toBe(0);
                done()
            }).catch((error) => done(error));
        });
    });

    it('should return an error if no toDate is provided', (done) => {
        let month = {
            fromDate: '9/3/2018'
        }
        request(app)
        .post('/api/v1/month-form')
        .send(month)
        .set({'token': Token})
        .expect(400)
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            expect(res.error.text).toContain(
                'Month validation failed: toDate: Path `toDate` is required.'
            );
            Month.find().then((res) => {
                expect(res.length).toBe(0);
                done()
            }).catch((error) => done(error));
        });
    });

    it('should return an error if no fromDate is provided', (done) => {
        let month = {
            toDate: '9/3/2018'
        }
        request(app)
        .post('/api/v1/month-form')
        .send(month)
        .set({'token': Token})
        .expect(400)
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            expect(res.error.text).toContain(
                'Month validation failed: fromDate: Path `fromDate` is required.'
            );
            Month.find().then((res) => {
                expect(res.length).toBe(0);
                done()
            }).catch((error) => done(error));
        });
    });
});


describe('PUT a month by id' , () => {
    beforeEach((done) => {
        Month.remove({}).then(() => {
            request(app)
            .post('/api/v1/month-form')
            .send(month)
            .set({'token': Token})
            .end((error) => {
                if(error) {
                    return done(error);
                }
                done()
            });
        })
    });
    it('should update the month successfully', (done) => {
        let monthUpdate = {
            fromDate: '1/10/2018',
            toDate: '2/11/2018',
        };
        let response = { message: 'Month form successfully updated!'}
        request(app)
        .put(`/api/v1/month-form/${month._id.toHexString()}`)
        .send(monthUpdate)
        .set({'token': Token})
        .expect(200)
        .expect((res) => {
            expect(res.body.message).toBe(response.message)
        })
        .end((error) => {
            if(error) {
                return done(error);
            }
            done();
        });
    });

    it('should update the month successfully if only the fromDate is updated', (done) => {
        let monthUpdate = {
            fromDate: '1/10/2018',
            toDate: '',
        };
        let response = { message: 'Month form successfully updated!'}
        request(app)
        .put(`/api/v1/month-form/${month._id.toHexString()}`)
        .send(monthUpdate)
        .set({'token': Token})
        .expect(200)
        .expect((res) => {
            expect(res.body.message).toBe(response.message)
        })
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            done();
        });
    });

    it('should return an error if updated with an empty fromDate', (done) => {
        let monthUpdate = {
            fromDate: '',
            toDate: '1/10/2018',
        };
        let response = { message: 'Month form successfully updated!'}
        request(app)
        .put(`/api/v1/month-form/${month._id.toHexString()}`)
        .send(monthUpdate)
        .set({'token': Token})
        .expect(200)
        .expect((res) => {
            expect(res.body.message).toBe(response.message)
        })
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            done();
        });
    });
});