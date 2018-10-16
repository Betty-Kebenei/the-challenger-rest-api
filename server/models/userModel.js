import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

const User = mongoose.model('User', UserSchema);
export default User;