import Month  from '../server/models/monthModel';
import Daily from '../server/controllers/dailycontroller';
import app from '../server/app';

import expect from 'expect';
import request from 'supertest';
import {ObjectId} from 'mongodb';

describe('Dailys', () => {
    let months = [
        {
            _id: new ObjectId(),
            fromDate: '1/2/2018',
            toDate: '1/3/2018'
        },
    ];
    let dailys = [
        {
            _id: new ObjectId(),
            chaptersMorning: 1,
            chaptersOthers: 0,
            riserTime: '5:00am',
            notes: false,
            prayer: false,
            smr: false,
            month: months[0]._id.toHexString()
        }
    ];
    beforeEach((done) => {
        Month.remove({}).then(() => {
            Month.insertMany(months);
            Daily.remove({}).then(() => {
                Daily.insertMany(dailys);
            }).then(() => done());
        }).then(() => done());
    });

    describe('GET all dailys', () => {
        it('should Get all daily data if found', (done) => {
            request(app)
            .get('/api/v1/month-form/${months[0]._id.toHexString()}/daily-data')
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
});