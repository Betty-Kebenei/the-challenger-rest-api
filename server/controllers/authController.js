import jwt from 'jsonwebtoken';

const tokenAuth = (req, res) => {
    const token = req.headers['x-access-token'];
    if(!token) return res.status(401).send({ message: 'No token provided.' });

    jwt.verify(token, 'secret_key', (error, userId) => {
        if(error) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });

        res.status(200).send(userId);
    });
};

export default { tokenAuth };