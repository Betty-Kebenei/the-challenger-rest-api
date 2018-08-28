import Month  from '../server/models/monthModel';

import expect from 'expect';
import request from 'supertest';
import {ObjectId} from 'mongodb';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

const should = chai.should();

chai.use(chaiHttp);

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
            let month = new Month ({
                fromDate: '10/2/2018',
                toDate: '9/3/2018'
            });
            month.save((error, month) => {
                chai.request(app)
                .get('api/v1/month-form' + month.id)
                .send(month)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('fromDate');
                    res.body.should.have.property('toDate');
                    res.body.lenght.should.be.eql(1);
                    done();
                });
            });
        });

        it('should return an error if no month is found by id', (done) => {
            chai.request(app)
            .get('api/v1/month-form' + month.id)
            .end((error, res) => {
                res.should.have.status(404);
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
            month.save((error, month) => {
                chai.request(app)
                .put('api/v1/month-form' + month.id)
                .send({ fromDate: '3/10/201', toDate: '1/11/2018' })
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Month updated successfully');
                    res.body.month.should.have.property('fromDate').eql('3/10/201')
                    res.body.month.should.have.property('toDate').eql('1/11/2018');
                    done();
                });
            });
        });

        it('should return an error if updated with an empty toDate', (done) => {
            let month = new Month ({
                fromDate: '1/10/2018',
                toDate: '2/11/2018',
            });
            month.save((error, month) => {
                chai.request(app)
                .put('api/v1/month-form' + month.id)
                .send({fromDate: '3/10/201', toDate: '' })
                .end((error, res) => {
                    res.should.have.status(409);
                    res.body.errors.should.have.property('toDate');
                    done();
                });
            });
        });

        it('should return an error if updated with an empty fromDate', (done) => {
            let month = new Month ({
                fromDate: '1/10/2018',
                toDate: '2/11/2018',
            });
            month.save((error, month) => {
                chai.request(app)
                .put('api/v1/month-form' + month.id)
                .send({ fromDate: '', toDate: '1/11/2018' })
                .end((error, res) => {
                    res.should.have.status(409);
                    res.body.errors.should.have.property('fromDate');
                    done();
                });
            });
        });
    });
});