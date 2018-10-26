import jwt from 'jsonwebtoken';

const tokenAuth = (req, res, next) => {
    const token = req.headers['token'];
    if(!token) return res.status(401).send({ message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
        if(error) return res.status(401).send({ 
            auth: false, 
            message: 'Failed to authenticate token.' 
        });

        req.userId = user.id;
        next();
    });
};


export default { tokenAuth };