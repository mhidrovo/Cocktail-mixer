/* Required modules: express, joi for validation, and /User to create
 * a new user object.  */
const router = require('express').Router();
const User = require('../User');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
// const express = require('express');
// const app = express();

var querystring = require('querystring');
const express_session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://mhidrovo:aaa@cluster0.jwixh.mongodb.net/Drinks?\
             retryWrites=true&w=majority";


// app.use(express.static('public'));
var isLoggedIn = false;



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
    input_data = "";
    req.on('data', data => {
       input_data += data.toString();
   });

   req.on('end', () => {
   input_data = querystring.parse(input_data);
   });
    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, db) {
        if(err) { 
            console.log("Connection err: " + err); return; 
        }
        var dbo = db.db("Drinks");
        var coll = dbo.collection('users'); 
        user_query = {username:input_data['username']};
        coll.find(user_query).toArray(async function(err, items) {
            if (err) {
                console.log("Error: " + err);
            } 
            else 
            {
                if (items.length == 0)
                {
                    coll.insertOne({"username":input_data['username'], "password":input_data['password']})
                    /* We should return to homepage  */
                    .then(res.redirect('/index'));
                }
                else 
                {
                    return res.redirect("/registerError");
                }
            }
        });
    });
});



router.post('/login', async (req, res) => {
     input_data = "";
     req.on('data', data => {
        input_data += data.toString();
    });

    req.on('end', () => {
    input_data = querystring.parse(input_data);
    });


    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if(err) { 
            console.log("Connection err: " + err); return; 
        }
        var dbo = db.db("Drinks");
        var coll = dbo.collection('users');

        user_query = {username:input_data['username']};
        coll.find(user_query).toArray(function(err, items) {
          if (err) {
            console.log("Error: " + err);
          } 
          else 
          {
            if (items.length == 0 || input_data['password'] != items[0].password)
                return res.redirect("/invalidLogin");
                isLoggedIn = true;
                return res.redirect('/home')
          }   
          db.close();
        });
    });
})


module.exports = router;
