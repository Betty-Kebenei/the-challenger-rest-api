import Month from '../models/monthModel';

const test = (req, res) => {
    res.send('Data to the test controller es6');
};

const postMonth = (req, res) => {
    let month = new Month ({ fromDate: req.body.fromDate, toDate: req.body.toDate });
    month.save( (error, month) => {
        if(error) {
            return res.status(400).send(error.message);
        }
        return res.status(201).json({ message: 'Month form successfully created!', month });
    });
};

const getAllMonths = (req, res) => {
    Month.find({}, (error, months) => {
        if(error) {
            return res.status(400).send(error.message);
        }
        if(months.length > 0) {
            return res.status(200).json(months);
        } 
        res.send("No have no month forms yet!");
    })
};

const getAMonth = (req, res) => {
    Month.findById(req.params.id, (error, month) => {
        if(error) {
            return res.status(404).send(error.message);
        }
        res.status(200).json(month);
    });
};

const updateAMonth = (req, res) => {
    Month.findByIdAndUpdate(req.params.id, {$set: req.body}, (error) => {
        if(error) {
            return res.status(400).send(error.message);
        }
        res.status(200).json({ message: 'Month form successfully updated!' });
    });
};

export default { test, postMonth, getAllMonths, getAMonth, updateAMonth };
