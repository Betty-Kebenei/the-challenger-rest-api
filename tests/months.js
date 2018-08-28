import Month  from '../server/models/monthModel';
import app from '../server/app';

import expect from 'expect';
import request from 'supertest';
import {ObjectId} from 'mongodb';

describe('Months', () => {
    let months = [
        {
            _id: new ObjectId(),
            fromDate: '1/2/2018',
            toDate: '1/3/2018'
        },
        {
            _id: new ObjectId(),
            fromDate: '2/3/2018',
            toDate: '2/4/2018'
        } 
    ];
    beforeEach((done) => {
        Month.remove({}).then(() => {
            Month.insertMany(months)
        }).then(() => done())
    });

    describe('GET all months', () => {
        it('should Get all months if found', (done) => {
            request(app)
            .get('/api/v1/month-form')
            .expect(200)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.length).toBe(2);
                done();
            });
        });
    });

    describe('GET one month by id', () => {
        it('should return the month', (done) => {
            request(app)
            .get('/api/v1/month-form/${months[0]._id.toHexString()}')
            .expect(200)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.length).toBe(1);
                done();
            });
        });

        it('should return no month', (done) => {
            request(app)
            .get('/api/v1/month-form/1')
            .expect(404)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.length).toBe(0);
                done();
            });
        });
    });

    describe('POST months', () => {
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
            .expect(201)
            .expect((res) => {
                expect(res.body.message).toBe(response.message)
            })
            .end((error) => {
                if(error) {
                    return done(error);
                }
                Month.find().then((res) => {
                    expect(res.length).toBe(3);
                    done()
                }).catch((error) => done(error));
            });
        });

        it('should return an error if no values are provided', (done) => {
            request(app)
            .post('/api/v1/month-form')
            .send({})
            .expect(400)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.error.text)
                .toBe(
                    'Month validation failed: fromDate: Path `fromDate` is required., toDate: Path `toDate` is required.')
                Month.find().then((res) => {
                    expect(res.length).toBe(2);
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
            .expect(400)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.error.text).toBe(
                    'Month validation failed: toDate: Path `toDate` is required.'
                );
                Month.find().then((res) => {
                    expect(res.length).toBe(2);
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
            .expect(400)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.error.text).toBe(
                    'Month validation failed: fromDate: Path `fromDate` is required.'
                );
                Month.find().then((res) => {
                    expect(res.length).toBe(2);
                    done()
                }).catch((error) => done(error));
            });
        });
    });
  

    describe('PUT a month by id' , () => {
        it('should update the month successfully', (done) => {
            let month = new Month ({
                _id: new ObjectId(),
                fromDate: '1/10/2018',
                toDate: '2/11/2018',
            });
            let response = { message: 'Month form successfully updated!'}
            request(app)
            .put('/api/v1/month-form/${months[0]._id.toHexString()}')
            .send(month)
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

        it('should return an error if updated with an empty toDate', (done) => {
            let month = new Month ({
                _id: new ObjectId(),
                fromDate: '1/10/2018',
                toDate: '',
            });
            request(app)
            .put('/api/v1/month-form/${months[0]._id.toHexString()}')
            .send(month)
            .expect(400)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.error.text).toBe(
                    'Month validation failed: toDate: Path `toDate` is required.'
                );
                done();
            });
        });

        it('should return an error if updated with an empty fromDate', (done) => {
            let month = new Month ({
                _id: new ObjectId(),
                fromDate: '',
                toDate: '1/10/2018',
            });
            request(app)
            .put('/api/v1/month-form/${months[0]._id.toHexString()}')
            .send(month)
            .expect(400)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.error.text).toBe(
                    'Month validation failed: fromDate: Path `fromDate` is required.'
                );
                done();
            });
        });
    });
});