import Daily from '../models/dailyModel';

const postDaily = (req, res) => {
    let daily = new Daily({
        chaptersMorning: req.body.chaptersMorning,
        chaptersOthers: req.body.chaptersOthers,
        riserTime: req.body.riserTime,
        notes: req.body.notes,
        prayer: req.body.prayer,
        smr: req.body.smr,
        dataValid: req.body.dataValid,
        month: req.params.id
    });
    daily.save((error, daily) => {
        if(error) {
            return res.status(400).send(error.message);
        }
        return res.status(201).json({ message: 'Daily data successfully added!', daily });
    });
};

const getAllDailyData = (req, res) => {
    Daily.find({'month': req.params.id}, (error, dailyData) => {
        if(error) {
            return res.status(400).send(error.message);
        }
        if(dailyData.length > 0) {
            return res.status(200).json(dailyData);
        } 
        res.send({message: "You have no daily data in this month form yet!"});
    });
};

const getADailyData = (req, res) => {
    Daily.findById(req.params.id, (error, data) => {
        if(error) {
            return res.status(404).send(error.message);
        }
        res.status(200).json(data);
    });
};

const updateADailyData = (req, res) => {
    Daily.findByIdAndUpdate(req.params.id, {$set: req.body}, (error) => {
        if(error) {
            return res.status(400).send(error.message);
        }
        res.status(200).json({ message: 'Daily data successfully updated!' });
    });
};

const deleteADailyData = (req, res) => {
    Daily.findByIdAndRemove(req.params.id, (error) => {
        if(error) {
            return res.status(400).send(error.message);
        }
        res.status(200).json({ message: 'Daily data successfully deleted!' });
    });
};

export default {
    postDaily,
    getAllDailyData,
    getADailyData,
    updateADailyData,
    deleteADailyData
};
