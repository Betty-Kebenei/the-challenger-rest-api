import Daily from '../models/dailyModel';

const postDaily = (req, res) => {
    let daily = new Daily({
        chaptersMorning: req.body.chaptersMorning,
        chaptersOthers: req.body.chaptersOthers,
        riserTime: req.body.riserTime,
        notes: req.body.notes,
        prayer: req.body.prayer,
        smr: req.body.smr,
        month: req.params.id
    });
    daily.save((error, daily) => {
        if(error) {
            return res.status(400).send(error.message);
        }
        return res.status(201).json({ message: 'Daily data successfully added!', daily });
    });
};

export default { postDaily };
