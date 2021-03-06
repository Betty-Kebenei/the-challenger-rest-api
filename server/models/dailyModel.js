import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let DailySchema = new Schema({
    chaptersMorning: {type: Number, required: true, min: 0},
    chaptersOthers: {type: Number, required: true, min: 0},
    riserTime: {type: String, required: true},
    notes: {type: Boolean, required: true},
    prayer: {type: Boolean, required: true},
    smr: {type: Boolean, required: true},
    dataValid:{type: Boolean, required: true},
    month: {type: Schema.Types.ObjectId, ref: 'Month', required: true}
});

const Daily = mongoose.model('Daily', DailySchema);
export default Daily;