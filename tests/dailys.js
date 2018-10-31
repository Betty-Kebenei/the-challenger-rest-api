import User from '../server/models/userModel';
import Month  from '../server/models/monthModel';
import Daily from '../server/models/dailyModel';
import app from '../server/app';
import bcrypt from 'bcrypt';

import expect from 'expect';
import request from 'supertest';
import {ObjectId} from 'mongodb';

let Token = '';
let userId = '';

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
            userId = (res.body.user._id).toHexString();
        })
        .end(()=> done())
    })
   
})

describe('Dailys', () => {
    let month = {
            _id: new ObjectId(),
            fromDate: '1/2/2018',
            toDate: '1/3/2018',
            user: userId
        }

    let dailys = [
        {
            _id: new ObjectId(),
            chaptersMorning: 1,
            chaptersOthers: 0,
            riserTime: '5:00am',
            notes: false,
            prayer: false,
            smr: false,
            dataValid: true,
            month: month._id.toHexString()
        }
    ];
    
    describe('GET all daily data for a month form', () => {
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
                });
            }).then(() => {
                Daily.remove({}).then(() => {
                    Daily.insertMany(dailys);
                }).then(() => done());
            });
        });
    
        it('should Get all daily data if found', (done) => {
            request(app)
            .get(`/api/v1/month-form/${month._id.toHexString()}/daily-data`)
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
    
    describe('POST daily data', () => {
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
                });
            }).then(() => {
                Daily.remove({}).then(() => {
                    Daily.insertMany(dailys);
                }).then(() => done());
            });
        });
        it('should successfully add a daily data', (done) => {
            let data = {
                _id: new ObjectId(),
                chaptersMorning: 1,
                chaptersOthers: 0,
                riserTime: '6:00am',
                notes: true,
                prayer: true,
                smr: true,
                dataValid: true,
                month: month._id.toHexString()
            }
            let response = { message: 'Daily data successfully added!'}
            request(app)
            .post(`/api/v1/month-form/${month._id.toHexString()}/daily-data`)
            .send(data)
            .set({'token': Token})
            .expect(201)
            .expect((res) => {
                expect(res.body.message).toBe(response.message)
            })
            .end((error) => {
                if(error) {
                    return done(error);
                }
                Daily.find().then((res) => {
                    expect(res.length).toBe(2);
                    done()
                }).catch((error) => done(error));
            });
        });

        it('should return an error if no values are provided', (done) => {
            request(app)
            .post(`/api/v1/month-form/${month._id.toHexString()}/daily-data`)
            .send({})
            .set({'token': Token})
            .expect(400)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                Daily.find().then((res) => {
                    expect(res.length).toBe(1);
                    done()
                }).catch((error) => done(error));
            });
        });

        it('should return an error if no chaptersMorning value is provided', (done) => {
            let data = {
                _id: new ObjectId(),
                chaptersOthers: 0,
                riserTime: '6:00am',
                notes: true,
                prayer: true,
                smr: true,
                dataValid: true,
                month: month._id.toHexString()
            }
            request(app)
            .post(`/api/v1/month-form/${month._id.toHexString()}/daily-data`)
            .send(data)
            .set({'token': Token})
            .expect(400)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.error.text).toBe(
                    'Daily validation failed: chaptersMorning: Path `chaptersMorning` is required.'
                );
                Daily.find().then((res) => {
                    expect(res.length).toBe(1);
                    done()
                }).catch((error) => done(error));
            });
        });

        it('should return an error if no chaptersOthers value is provided', (done) => {
            let data = {
                _id: new ObjectId(),
                chaptersMorning: 1,
                riserTime: '6:00am',
                notes: true,
                prayer: true,
                smr: true,
                dataValid: true,
                month: month._id.toHexString()
            }
            request(app)
            .post(`/api/v1/month-form/${month._id.toHexString()}/daily-data`)
            .send(data)
            .set({'token': Token})
            .expect(400)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.error.text).toBe(
                    'Daily validation failed: chaptersOthers: Path `chaptersOthers` is required.'
                );
                Daily.find().then((res) => {
                    expect(res.length).toBe(1);
                    done()
                }).catch((error) => done(error));
            });
        });

        it('should return an error if no riserTime value is provided', (done) => {
            let data = {
                _id: new ObjectId(),
                chaptersMorning: 1,
                chaptersOthers: 1,
                notes: true,
                prayer: true,
                smr: true,
                dataValid: true,
                month: month._id.toHexString()
            }
            request(app)
            .post(`/api/v1/month-form/${month._id.toHexString()}/daily-data`)
            .send(data)
            .set({'token': Token})
            .expect(400)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.error.text).toBe(
                    'Daily validation failed: riserTime: Path `riserTime` is required.'
                );
                Daily.find().then((res) => {
                    expect(res.length).toBe(1);
                    done()
                }).catch((error) => done(error));
            });
        });

        it('should return an error if no notes value is provided', (done) => {
            let data = {
                _id: new ObjectId(),
                chaptersMorning: 1,
                chaptersOthers: 1,
                riserTime: '6:00am',
                prayer: true,
                smr: true,
                dataValid: true,
                month: month._id.toHexString()
            }
            request(app)
            .post(`/api/v1/month-form/${month._id.toHexString()}/daily-data`)
            .send(data)
            .set({'token': Token})
            .expect(400)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.error.text).toBe(
                    'Daily validation failed: notes: Path `notes` is required.'
                );
                Daily.find().then((res) => {
                    expect(res.length).toBe(1);
                    done()
                }).catch((error) => done(error));
            });
        });

        it('should return an error if no prayer value is provided', (done) => {
            let data = {
                _id: new ObjectId(),
                chaptersMorning: 1,
                chaptersOthers: 1,
                riserTime: '6:00am',
                notes: true,
                smr: true,
                dataValid: true,
                month: month._id.toHexString()
            }
            request(app)
            .post(`/api/v1/month-form/${month._id.toHexString()}/daily-data`)
            .send(data)
            .set({'token': Token})
            .expect(400)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.error.text).toBe(
                    'Daily validation failed: prayer: Path `prayer` is required.'
                );
                Daily.find().then((res) => {
                    expect(res.length).toBe(1);
                    done()
                }).catch((error) => done(error));
            });
        });

        it('should return an error if no smr value is provided', (done) => {
            let data = {
                _id: new ObjectId(),
                chaptersMorning: 1,
                chaptersOthers: 1,
                riserTime: '6:00am',
                notes: true,
                prayer: true,
                dataValid: true,
                month: month._id.toHexString()
            }
            request(app)
            .post(`/api/v1/month-form/${month._id.toHexString()}/daily-data`)
            .send(data)
            .set({'token': Token})
            .expect(400)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.error.text).toBe(
                    'Daily validation failed: smr: Path `smr` is required.'
                );
                Daily.find().then((res) => {
                    expect(res.length).toBe(1);
                    done()
                }).catch((error) => done(error));
            });
        });
    });

    describe('GET daily data by id', () => {
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
                });
            }).then(() => {
                Daily.remove({}).then(() => {
                    Daily.insertMany(dailys);
                }).then(() => done());
            });
        });

        it('should Get daily data  by id if found', (done) => {
            request(app)
            .get(`/api/v1/month-form/${month._id.toHexString()}/daily-data/${dailys[0]._id.toHexString()}`)
            .set({'token': Token})
            .expect(200)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.body._id).toEqual(dailys[0]._id.toHexString());
                expect(res.body.chaptersMorning).toEqual(1);
                expect(res.body.chaptersOthers).toEqual(0);
                expect(res.body.riserTime).toEqual('5:00am');
                expect(res.body.notes).toEqual(false);
                expect(res.body.prayer).toEqual(false);
                expect(res.body.smr).toEqual(false);
                done();
            });
        });

        it('should return an error the id does not exist', (done) => {
            request(app)
            .get(`/api/v1/month-form/${month._id.toHexString()}/daily-data/1`)
            .set({'token': Token})
            .expect(404)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                expect(res.body).toEqual({});
                done();
            });
        });
    });

    describe('PUT a daily data', () => {
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
                });
            }).then(() => {
                Daily.remove({}).then(() => {
                    Daily.insertMany(dailys);
                }).then(() => done());
            });
        });
        
        it('should successfully update a daily data', (done) => {
            let data = {
                chaptersMorning: 3,
                chaptersOthers: 1,
                riserTime: '4:00am',
                notes: true,
                prayer: true,
                smr: false,
                dataValid: true,
            }
            let response = { message: 'Daily data successfully updated!'}
            request(app)
            .put(`/api/v1/month-form/${month._id.toHexString()}/daily-data/${dailys[0]._id.toHexString()}`)
            .set({'token': Token})
            .send(data)
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
    });

    describe('Delete a daily data', () => {
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
                });
            }).then(() => {
                Daily.remove({}).then(() => {
                    Daily.insertMany(dailys);
                }).then(() => done());
            });
        });
        
        it('should successfully delete a daily data', (done) => {
            let response = { message: 'Daily data successfully deleted!'}
            request(app)
            .delete(`/api/v1/month-form/${month._id.toHexString()}/daily-data/${dailys[0]._id.toHexString()}`)
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
});