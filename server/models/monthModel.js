import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let MonthSchema = new Schema({
    fromDate: {type: String, required: true},
    toDate: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

const Month = mongoose.model('Month', MonthSchema);
export default Month;
