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

async function loginUser (req, res) {
    const user = await User.findOne({'email': req.body.email})
    if(user){
        const userWithPassword = await User.findOne({
            'email': req.body.email,
            'password': req.body.password
        });
        if(userWithPassword) {
            return res.status(200).json({message: 'User successfully logged in.'})
        } else {
            return res.status(400).json({message: 'Wrong password. Try again.'});
        }
    } else {
        return res.status(400).json({message: 'User with that email does not exists. Please register.'});
    }
};

export default { registerUser, loginUser };