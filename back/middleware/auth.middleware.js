const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const [strategy, token] = req.headers['authorization'].split(' ');
        const result = jwt.verify(token, 'secretKey');
        next();
    } catch (e) {
        res.status(401).send(e.message)
    }
}

