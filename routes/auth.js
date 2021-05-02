/* Required modules: express, joi for validation, and /User to create
 * a new user object.  */
const router = require('express').Router();
const User = require('../User');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
var querystring = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://mhidrovo:aaa@cluster0.jwixh.mongodb.net/Drinks?\
             retryWrites=true&w=majority";





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
    //  res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write("<h2> PROCESSING FORM </h2>");
     input_data = "";
     req.on('data', data => {
        input_data += data.toString();
    });

    req.on('end', () => {
    input_data = querystring.parse(input_data);
    })


    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if(err) { 
            console.log("Connection err: " + err); return; 
        }
        var dbo = db.db("Drinks");
        var coll = dbo.collection('users');
        console.log("before find");
        user_query = {username:input_data['username']};
        coll.find(user_query).toArray(function(err, items) {
          if (err) {
            console.log("Error: " + err);
          } 
          else 
          {
            // if(input_data['password'] != items[0].password)
            //     return res.send("Incorrect password");
            if (items.length == 0)
                return res.send("Not found");
            if(input_data['password'] != items[0].password)
                return res.send("Incorrect password");
            const token = jwt.sign({_id: items[0]._id}, 'logged_in_for_now'); 
            res.header('auth-token', token).send(token);
            // localStorage.setItem('auth-token', token);
          }   
          db.close();
        });
    });





     

    // const user = await User.find({username: input_data['username']});
    // var stream = await User.find({username:input_data['username']});
    // stream.on('data', function(users){
    //     users.forEach(function(user){
    //        console.log(user.username);
    //     });
    // });
    // stream.on('error', function(error){
    //     console.log(error);
    // });


    // const Dan = User.find({username:"Dan"});
    // console.log(Dan.username);
    // User.find({ username: input_data['username'] }).then(users => {              
    //     console.log(users[0].username); // 'A'
    // });






    // console.log("Our username is: " + user[0].username);
    // console.log("Username is " + user.username + "and pasword:" + user.password);


    // if (user == null) {
    //     console.log(input_data['username'] + " is the username");
    //     return res.status(400).send("This means username doesn't exist");
    // } 

    // // console.log("Password stored in DB is: " + user[0].password);
    // console.log("Password inputted by user is: " + input_data['password']);
   
    // // if ( input_data['password'] != user.password ) return res.status(400).send("The passwords do not match");

    // Creating and assign Web Token 

    // res.send();
    
})


module.exports = router;
