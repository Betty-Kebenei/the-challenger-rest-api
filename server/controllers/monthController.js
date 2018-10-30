import Month from '../models/monthModel';

async function postMonth (req, res) {
    let month = new Month ({ 
        fromDate: req.body.fromDate, 
        toDate: req.body.toDate,
        user: req.userId,
    });
    const duplicateFromDate = await Month.find({'user': req.userId, 'fromDate': req.body.fromDate});
    const duplicateToDate = await Month.find({'user': req.userId, 'toDate': req.body.toDate});
    
    month.save( (error, month) => {
        if(duplicateFromDate.length > 0){
            return res.send({message: 'You already have a month form with that From Date!'});
        } else if(duplicateToDate.length > 0){
            return res.send({message: 'You already have a month form with that To Date!'});
        } else {
            if(error) {
                return res.status(400).json(error.message);
            }
            return res.status(201).json({ 
                message: 'Month form successfully created!',
                month 
            });
        }
    });
};

const getAllMonths = (req, res) => {
    Month.find({'user': req.userId}, (error, months) => {
        if(error) {
            return res.status(400).json(error.message);
        }
        if(months.length > 0) {
            return res.status(200).json(months);
        } 
        res.send({message: "You have no month forms yet!"});
    })
};

const getAMonth = (req, res) => {
    Month.findById(req.params.id, (error, month) => {
        if(error) {
            return res.status(404).json(error.message);
        }
        res.status(200).json(month);
    });
};

const updateAMonth = (req, res) => {
    Month.findByIdAndUpdate(req.params.id, {$set: req.body}, (error) => {
        if(error) {
            return res.status(400).json(error.message);
         }
        res.status(200).json({ message: 'Month form successfully updated!' });
    });
};

const deleteAMonth= (req, res) => {
    Month.findByIdAndDelete(req.params.id, (error) => {
        if(error) {
            return res.status(400).json(error.message);
        }
        res.status(200).json({ message: 'Month form successfully deleted!' });
    });
};

export default { postMonth, getAllMonths, getAMonth, updateAMonth, deleteAMonth };
