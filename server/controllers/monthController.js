import Month from '../models/monthModel';
import { runInNewContext } from 'vm';

const test = (req, res) => {
    res.send('Data to the test controller es6');
};

const postMonth = (req, res) => {
    let month = new Month ({ fromDate: req.body.fromDate, toDate: req.body.toDate });
    month.save( (error, month) => {
        if(error) {
            return res.status(400).send(error.message);
        }
        res.status(201).json({ message: 'Month form successfully created!', month });
    });
};

export default { test, postMonth };
