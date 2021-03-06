import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function registerUser (req, res) {
    if(!req.body.password) {
        const message = "User validation failed: Password is required."
        return res.status(400).json(message); 
    }
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    const emailRequired = 'User validation failed: email: Path `email` is required.';
    const passwordRequired = 'User validation failed: password: Path `password` is required.';
    let usernameExists = false;
    await User.find({'username': req.body.username }, (error, users) => {
        if(users.length > 0) {
            usernameExists = true;
            return usernameExists
        }
    });
    let emailExists = false;
    await User.find({'email': req.body.email }, (error, users) => {
        if(users.length > 0) {
            emailExists = true;
            return emailExists
        }
    });

    user.save((error, user) => {
        if(error) {
            let message;
            if(error.message === emailRequired){
                message = 'User validation failed: Email is required.';
            } else if(error.message === passwordRequired) {
                message = 'User validation failed: Password is required.';
            } else if(usernameExists){
                message = 'User with that username already exists. Please use another username.';
            } else if (emailExists) {
                message = 'User with that email already exists. Please use another email.';
            } else {
                message = error.message;
            }
            return res.status(400).json(message);
        } 
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: 86400});
        return res.status(201).json({message: 'User successfully created!', user, token})
    });


};

async function loginUser (req, res) {
    const user = await User.findOne({'email': req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: 86400});
            return res.status(200).json({message: 'User successfully logged in.', token});
        } else {
            return res.status(400).json({message: 'Wrong password. Try again.'});
        }
    } else {
        return res.status(400).json({message: 'User with that email does not exists. Please register.'});
    }
};

async function addUserProfile(req, res) {
    User.findByIdAndUpdate(req.userId, {$set: req.body}, (error, user) => {
        if(error) {
            return res.status(400).json(error.message);
        }
        res.status(200).json({ message: 'User profile successfully added!', user });
    });
}

async function fetchUser(req, res) {
    User.findById(req.userId, (error, user) => {
        if(error) {
            return res.status(404).json(error.message);
        }
        res.status(200).json(user);
    });
}

export default { registerUser, loginUser, addUserProfile, fetchUser };