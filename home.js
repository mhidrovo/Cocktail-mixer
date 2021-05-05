/* Home.js: the backbone of the web app. 
 * It listens the app on a local port or through Heroku and helps
 * the user navigate through the program. 
 */

// These are the modules we will be using. 
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');



/* Mongo DB connection string*/
const url = "mongodb+srv://mhidrovo:aaa@cluster0.jwixh.mongodb.net/Drinks?retryWrites=true&w=majority"; 
const app = express();

mongoose.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true }, () =>
                console.log("Connected!"));

// Middleware:
app.use(express.json());
// Route middlewares:
app.use("/api/user", authRoute);


/* App redirections when a user clicks on a hyperlink.  */
app.get('/about', function(req, res)  {
  res.sendFile(path.join(__dirname, '/public', 'about2.html'));
  console.log('listening')
});


app.get('/invalidLogin', function(req, res)  {
  res.sendFile(path.join(__dirname, '/public', 'loginError.html'));
  console.log('listening')
});

app.get('/registerError', function(req, res)  {
  res.sendFile(path.join(__dirname, '/public', 'signupError.html'));
  console.log('listening')
});

app.get('/index', function(req, res)  {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
  console.log('listening');
});

app.get('/cocktails', function(req, res)  {
  res.sendFile(path.join(__dirname, '/public', 'cocktails.html'));
  console.log('listening');
});

app.get('/home', function(req, res)  {
  res.sendFile(path.join(__dirname, '/public', 'home.html'));
  console.log('listening');
});


//gets css & pictures & any other static file
app.use(express.static('public'))
const port = process.env.PORT || 4000;


app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, function() {
    console.log('Welcome to our app!');
  });

