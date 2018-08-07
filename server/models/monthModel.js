import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let MonthSchema = new Schema({
    fromDate: {type: Date, required: true, unique: true},
    toDate: {type: Date, required: true, uniques: true}
});

const Month = mongoose.model('Month', MonthSchema);
export default Month;
