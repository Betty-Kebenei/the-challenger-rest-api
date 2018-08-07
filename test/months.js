import Month  from '../server/models/monthModel';

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

const should = chai.should();

chai.use(chaiHttp);

describe('Months', () => {
    beforeEach((done) => {
        Month.remove({}, (error) => {
            done();
        });
    });

    describe('GET all months', () => {
        it('should Get all months if found', (done) => {
            let month = new Month ({
                fromDate: '10/2/2018',
                toDate: '9/3/2018'
            });
            month.save((error, month) => {
                chai.request(app)
                .get('api/v1/month-form')
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.lenght.should.be.eql(1);
                    done();
                });
            });
        });

        it('should return an error is no month is found', (done) => {
            chai.request(app)
            .get('api/v1/month-form')
            .end((error, res) => {
                res.should.have.status(404);
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
                fromDate: '10/2/2018',
                toDate: '9/3/2018'
            }
            chai.request(app)
            .post('api/v1/month-form')
            .send(month)
            .end((error, res) => {
                res.should.have.status(201);
                res.body.should.have.property('fromDate');
                res.body.should.have.property('toDate');
                done();
            });
        });

        it('should return an error if no toDate is provided', (done) => {
            let month = {
                fromDate: '9/3/2018'
            }
            chai.request(app)
            .post('api/v1/month-form')
            .send(month)
            .end((error, res) => {
                res.should.have.status(409);
                res.body.errors.should.have.property('toDate');
                done();
            });
        });

        it('should return an error if no fromDate is provided', (done) => {
            let month = {
                toDate: '10/2/2018',
            }
            chai.request(app)
            .post('api/v1/month-form')
            .send(month)
            .end((error, res) => {
                res.should.have.status(409);
                res.body.errors.should.have.property('fromDate');
                done();
            });
        });
    });

    describe('PUT a month by id' , () => {
        it('should update the month successfully', (done) => {
            let month = new Month ({
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