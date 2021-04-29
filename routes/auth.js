/* Required modules: express, joi for validation, and /User to create
 * a new user object.  */
const router = require('express').Router();
const User = require('../User');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

/* Join object will verify that username and password are at least
 * 6 characters long.  */
const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
    
});

/* When a user clicks on register, they will be taken here
    Returns: error with 400 status to be displayed on the page. 
             Error is already in text mode so front end just needs 
             to display it. 
    If no errors are present, it creates a new User and saves it on the 
    database. 
    Note: passwords are not hashed, so we will see your information. 
*/
router.post('/register', async (req, res) =>
{

    
    //ensures proper username/password for registering
    const { error } = schema.validate({username: req.body.username, password: req.body.password});
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    //checks to see if username already exists in database
    const usernameExists = await User.findOne({username: req.body.username});
    if (usernameExists) return res.status(400).send("Username already exists.");
    
    //creates a new user for the database
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    //will send if valid username, else will produce an error
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }

});


router.post('/login', async (req, res) => {
     //checks to see if username already exists in database
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send("Incorrect username or password");
    if ( req.body.password != user.password ) return res.status(400).send("Incorrect username or password");

    // Creating and assign Web Token 
    const token = jwt.sign({_id: user._id}, 'logged_in_for_now'); 

    res.header('auth-token', token).send(token);

    // res.send("Logged in!");
    
})


module.exports = router;
