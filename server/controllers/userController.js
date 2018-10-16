import User from '../models/userModel';

const registerUser = (req, res) => {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    const emailRequired = 'User validation failed: email: Path `email` is required.';
    const passwordRequired = 'User validation failed: password: Path `password` is required.';
    let usernameExists = false;
    User.find({'username': req.body.username }, (error, users) => {
        if(users.length > 0) {
            usernameExists = true;
            return usernameExists
        }
    })

    user.save((error, user) => {
        if(error) {
            let message;
            if(error.message === emailRequired){
                message = 'User validation failed: Email is required.';
            } else if(error.message === passwordRequired) {
                message = 'User validation failed: Password is required.';
            } else if(usernameExists){
                message = 'User with that username already exists. Please use another username.';
            } else {
                message = 'User with that email already exists. Please use another email.'
            }
            return res.status(400).json(message);
        } 
        return res.status(201).json({message: 'User successfully created!', user})
    });


};

const getAUser = (req, res) => {

};

export default { registerUser };