const jwt = require('jsonwebtoken');

module.exports =  function(req, res, next)
{
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Acces Denied. Please log in.");

    try {
        const verified = jwt.verify(token, 'logged_in_for_now')
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

