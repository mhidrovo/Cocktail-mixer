/* Is there a way to split this into files? */
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://mhidrovo:aaa@cluster0.jwixh.mongodb.net/Drinks?retryWrites=true&w=majority"; 

const bodyParser = require('body-parser');
const express = require('express');
const app = express()

//gets css & pictures & any other static file
app.use(express.static('D:/web programming/SpotifyFinal'))



app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3030, function() {
    console.log('listening on 3030')
  })

app.get('/', function(req, res)  {

    res.sendFile('D:/web programming/SpotifyFinal' + '/index.html')
    console.log('fuck')
})

app.get('/index.html', function(req, res)  {

    res.sendFile('D:/web programming/SpotifyFinal' + '/index.html')
    console.log('fuck')
})

app.get('/login.html', function(req, res)  {

    res.sendFile('D:/web programming/SpotifyFinal' + '/login.html')
    console.log('fuck')
})


app.post('/getInfo', (req, res) => {
    console.log(req.body)
})

// app.use(express.static('SpotifyFinal'));


var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

// var port = process.env.PORT || 3000;




server = http.createServer(function(req, res)
{
    if(req.url == "/") {
        file = 'index.html';
        fs.readFile(file, function(err, txt){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(txt);
        res.end();
        });
    }
    else if(req.url == "/login")
    {
        file = 'login.html';

        fs.readFile(file, function(err, txt){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(txt);
            res.end();
            });
    }
    else if(req.url == '/process')
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h2> PROCESSING FORM </h2>");
        input_data = "";
        req.on('data', data => {
            input_data += data.toString();
        });
        req.on('end', () => {
            input_data = querystring.parse(input_data);
            // res.write(input_data['username'] + "<br>" + input_data['password']);
            MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
                if(err) { 
                    console.log("Connection err: " + err); return; 
                }
              
                var dbo = db.db("Drinks");
                var coll = dbo.collection('final');
                console.log("before find");
                user_query = {user:input_data['username']};
                coll.find(user_query).toArray(function(err, items) {
                  if (err) {
                    console.log("Error: " + err);
                  } 
                  else if(items.length == 0)
                  {
                        var newData = {"username": input_data['username'], "password": input_data['password']};
                        coll.insertOne(newData, function(err, res) {
                        if(err) { console.log("query err: " + err); return; }
                        console.log("new document inserted");
                        });
                  }
                  else
                  {
                    //   How to redirect?
                      res.write("Username already exists. Please try again");
                  }
                  
                });
                res.writeHead(301,
                    {Location: 'http://localhost:3030/login'}
                  );
                  res.end();
                // setTimeout(function(){ res.end(); }, 4000); 
            });
        })
        /* Hardcoding it more or less... is there a better way to do so? */
        setTimeout(function(){ res.end(); }, 6000);
    }
    else if(req.url == "/getInfo") 
    {
        input_data = "";
        req.on('data', data => {
            input_data += data.toString();
        });
        req.on('end', () => {
            input_data = querystring.parse(input_data);
            console.log(input_data['query_string']);
            
            var url = input_data['query_string'];
            let fetchDataFromAPI = async (url) => {
                console.log("hello");
                let response =  await fetch(url);
                let result = await response.json();
                // let dude = JSON.stringify(result);
                console.log("done!...?")
                // alert("bye");
            }
            // alert(JSON.stringify(result));



            let response = fetch(input_data['query_string']);

            if (response.ok) { // if HTTP-status is 200-299
                // get the response body (the method explained below)
                let json =  response.json();
            } else {
                console.log("HTTP-Error: " + response.status);
            }

            
            to_alert = JSON.stringify(json);
            console.log(to_alert);
            alert(to_alert);

            //fetch(input_data['query_string']).then(res => res.json()).then(data => console.log(data)).catch(err =>console.log(err));
        })
        //DO EXPRESS AND THEN FETCH
    }
    else
    {
        res.end();
    }
    
})

//server.listen(3030);
