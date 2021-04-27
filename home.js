const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://mhidrovo:aaa@cluster0.jwixh.mongodb.net/Drinks?retryWrites=true&w=majority"; 

var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

var port = process.env.PORT || 3000;

http.createServer(function(req, res)
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
        // MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        //     if(err) { 
        //         console.log("Connection err: " + err); return; 
        //     }
          
        //     var dbo = db.db("Drinks");
        //     var coll = dbo.collection('final');
        //     console.log("before find");

        //     // user_query = 


        //     user_query = {company:input_data['company_input']};
        //     if (input_data['company_input'] == "")
        //         user_query = {ticker:input_data['ticker_input']};
        //     coll.find(user_query).toArray(function(err, items) {
        //       if (err) {
        //         console.log("Error: " + err);
        //       } 
        //       else 
        //       {
        //         // res.write("HEY I THINK I DID IT!");
                
        //         for (i=0; i<items.length; i++)
        //             res.write(i + ": " + items[i].company + " Ticker: " + items[i].ticker);
        //         if (items.length == 0)
        //             res.write("Not found");
        //       }   
        //       db.close();
        //     });
        //     // res.end();
        // });
    }
}.listen(port);

