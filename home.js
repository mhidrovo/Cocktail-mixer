/* Is there a way to split this into files? */
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const bodyParser = require('body-parser');
const express = require('express');
// const dotenv = require('dotenv');
// Mijael says this: 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// dotenv.configure();

const url = "mongodb+srv://mhidrovo:aaa@cluster0.jwixh.mongodb.net/Drinks?retryWrites=true&w=majority"; 
const app = express();

mongoose.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true }, () =>
                console.log("Connected!"));

// Middleware:
app.use(express.json());
// Route middlewares:
app.use("/api/user", authRoute);

// var drinkSchema = new mongoose.Schema(
//     {
//         username: {type: String, unique: true , required: true, maxLength: 100},
//         password: {type: String, unique: false, required: true, maxLength: 100},
//         drinks: [{}]
//     }
// )




//gets css & pictures & any other static file
app.use(express.static('public'))
const port = process.env.PORT || 3000;

// app.get('/', function(req, res)  {

//     res.send('testing testing testing')
//     console.log('listening')
// })


app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, function() {
    console.log('listening on 3000');
  });

