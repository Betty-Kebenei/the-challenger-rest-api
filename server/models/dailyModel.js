import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let DailySchema = new Schema({
    chaptersMorning: {type: Number, required: true, min: 0},
    chaptersOthers: {type: Number, required: true, min: 0},
    riserTime: {type: Date, required: true},
    notes: {type: Boolean, required: true},
    prayer: {type: Boolean, required: true},
    smr: {type: Boolean, required: true},
    month: {type: Schema.Types.ObjectId, ref: 'Month', required: true}
});

const Daily = mongoose.model('Daily', DailySchema);
module.exports = Daily;