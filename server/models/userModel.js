import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bio: {type: String},
    telephone: {type: String},
    church: {type: String},
    photo: {type: String}
});

const User = mongoose.model('User', UserSchema);
export default User;