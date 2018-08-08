import Month from '../models/monthModel';
import { runInNewContext } from 'vm';

const test = (req, res) => {
    res.send('Data to the test controller es6');
};

const postMonth = (req, res) => {
    let month = new Month ({ fromDate: req.body.fromDate, todate: req.body.todate });
    month.save( (error, month) => {
        if(error) {
            res.next(error.message, res.status = 400);
        }
        res.json({ message: 'Month form successfully created!', month }, res.status = 201);
    });
};

export default { test, postMonth };
