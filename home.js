/* Is there a way to split this into files? */
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
// Mijael says this: 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



const url = "mongodb+srv://mhidrovo:aaa@cluster0.jwixh.mongodb.net/Drinks?retryWrites=true&w=majority"; 
const app = express();

mongoose.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true }, () =>
                console.log("Connected!"));

// Middleware:
app.use(express.json());
// Route middlewares:
app.use("/api/user", authRoute);
// app.use("/")
// var drinkSchema = new mongoose.Schema(
//     {
//         username: {type: String, unique: true , required: true, maxLength: 100},
//         password: {type: String, unique: false, required: true, maxLength: 100},
//         drinks: [{}]
//     }
// )
// app.get()


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
    console.log('listening on 3000');
  });

